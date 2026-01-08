import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Download, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import DateTimePicker from '@react-native-community/datetimepicker';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { moveAsync, cacheDirectory } from 'expo-file-system/src/legacy/FileSystem';

import Svg, { Rect, Text as SvgText, Line, G } from 'react-native-svg';
import AnimatedAlert, { AnimatedAlertProps } from '../../components/common/AnimatedAlert';
import { api } from '../../services/api';

const { width } = Dimensions.get('window');

export default function Reports() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState('1');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [graphData, setGraphData] = useState<{ day: string; absentees: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);

    // Alert State
    const [alertConfig, setAlertConfig] = useState<Partial<AnimatedAlertProps>>({ visible: false });

    useEffect(() => {
        fetchData();
    }, [selectedDate, selectedYear]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const dateStr = selectedDate.toISOString();
            const data = await api.getWeeklyAbsentees(dateStr, selectedYear);
            setGraphData(data);
        } catch (error) {
            console.error('Failed to fetch report data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousDay = () => {
        const prev = new Date(selectedDate);
        prev.setDate(prev.getDate() - 1);
        setSelectedDate(prev);
    };

    const handleNextDay = () => {
        const next = new Date(selectedDate);
        next.setDate(next.getDate() + 1);
        if (next <= new Date()) {
            setSelectedDate(next);
        }
    };

    const isNextDisabled = () => {
        const next = new Date(selectedDate);
        next.setDate(next.getDate() + 1);
        return next > new Date();
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const onChangeDate = (event: any, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleDownloadPress = () => {
        setAlertConfig({
            visible: true,
            title: 'Download Report',
            message: (
                <View>
                    <Text className="text-gray-500 dark:text-gray-400 text-center leading-5 mb-2">
                        Do you want to download the report for
                    </Text>
                    <Text className="text-gray-900 dark:text-white font-bold text-center text-lg mb-1">
                        {formatDate(selectedDate)}
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-center text-xs uppercase font-bold mb-1">
                        For
                    </Text>
                    <Text className="text-blue-600 font-bold text-center text-xl">
                        {selectedYear === 'All' ? 'All Years' : selectedYear + (selectedYear === '1' ? 'st' : selectedYear === '2' ? 'nd' : selectedYear === '3' ? 'rd' : 'th') + ' Year'}
                    </Text>
                </View>
            ),
            type: 'download',
            buttonText: 'Download',
            showCancel: true,
            onClose: generatePDF, // proceed
            onCancel: () => setAlertConfig({ visible: false })
        });
    };

    const generatePDF = async () => {
        setAlertConfig({ visible: false });
        setGenerating(true);
        try {
            const data = await api.getDailyReport(selectedDate.toISOString(), selectedYear);

            const html = `
                <html>
                    <head>
                        <style>
                            body { font-family: 'Helvetica', sans-serif; margin: 0; padding: 0; }
                            .page { padding: 40px; page-break-after: always; min-height: 90vh; position: relative; }
                            .page:last-child { page-break-after: auto; }
                            
                            /* Page 1: Cover */
                            .cover-container { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 80vh; text-align: center; }
                            .app-name { font-size: 24px; color: #666; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
                            .report-title { font-size: 48px; font-weight: bold; color: #2563EB; margin-bottom: 30px; }
                            .cover-meta { font-size: 18px; color: #444; margin-top: 10px; line-height: 1.6; }
                            .generated-by { position: absolute; bottom: 40px; width: 100%; text-align: center; color: #888; font-size: 14px; }

                            /* Page 2: Content */
                            .header { display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
                            .header-title { font-size: 24px; font-weight: bold; color: #111; }
                            .header-date { text-align: right; color: #666; font-size: 14px; }
                            
                            .stats-container { margin-bottom: 40px; }
                            .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; background: #f9f9f9; }
                            .stat-val { font-size: 28px; font-weight: bold; color: #111; }
                            .stat-label { font-size: 12px; text-transform: uppercase; color: #888; letter-spacing: 1px; }
                            .grid-3 { display: flex; justify-content: space-between; gap: 15px; }
                            .col-3 { width: 32%; }

                            table { width: 100%; border-collapse: collapse; font-size: 12px; }
                            th { text-align: left; padding: 10px; background: #f3f4f6; color: #374151; font-weight: bold; border-bottom: 2px solid #e5e7eb; }
                            td { padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937; }
                            tr:nth-child(even) { background: #f9fafb; }
                            
                            .status-badge { padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; display: inline-block; }
                            .status-present { background: #dcfce7; color: #166534; }
                            .status-absent { background: #fee2e2; color: #991b1b; }
                            .status-na { background: #f3f4f6; color: #6b7280; }
                        </style>
                    </head>
                    <body>
                        <!-- Page 1 -->
                        <div class="page">
                            <div class="cover-container">
                                <div class="app-name">College Attendance System</div>
                                <div class="report-title">Daily Attendance Report</div>
                                <div class="cover-meta">
                                    <strong>Date:</strong> ${formatDate(selectedDate)}<br/>
                                    <strong>Year:</strong> ${selectedYear === 'All' ? 'All Years' : selectedYear + ' Year'}
                                </div>
                            </div>
                            <div class="generated-by">Generated on ${new Date().toLocaleString()}</div>
                        </div>

                        <!-- Page 2 -->
                        <div class="page">
                            <div class="header">
                                <div class="header-title">Student Summary</div>
                                <div class="header-date">${formatDate(selectedDate)}</div>
                            </div>

                            <div class="stats-container grid-3">
                                <div class="card col-3">
                                    <div class="stat-val" style="color: #2563EB">${data.total}</div>
                                    <div class="stat-label">Total Students</div>
                                </div>
                                <div class="card col-3">
                                    <div class="stat-val" style="color: #16A34A">${data.present}</div>
                                    <div class="stat-label">Present</div>
                                </div>
                                <div class="card col-3">
                                    <div class="stat-val" style="color: #DC2626">${data.absent}</div>
                                    <div class="stat-label">Absent</div>
                                </div>
                            </div>

                            <h3>Student Details</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th style="width: 50px">S.No</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Year</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data.students.map((student: any, index: number) => `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>${student.name}</td>
                                            <td>${student.department}</td>
                                            <td>${student.year}</td>
                                            <td>
                                                <span class="status-badge ${student.status === 'Present' ? 'status-present' : student.status === 'Absent' ? 'status-absent' : 'status-na'}">
                                                    ${student.status}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </body>
                </html>
            `;

            const { uri } = await printToFileAsync({ html });

            // Rename file to "Daily_Attendance_Report_YYYY-MM-DD.pdf"
            const dateStr = selectedDate.toISOString().split('T')[0];
            const fileName = `Daily_Attendance_Report_${dateStr}.pdf`;
            const newFileUri = (cacheDirectory || '') + fileName;

            await moveAsync({
                from: uri,
                to: newFileUri
            });

            await shareAsync(newFileUri, { UTI: '.pdf', mimeType: 'application/pdf' });

            setAlertConfig({
                visible: true,
                title: 'Success',
                message: 'Report downloaded successfully.',
                type: 'success',
                onClose: () => setAlertConfig({ visible: false })
            });

        } catch (error) {
            console.error(error);
            setAlertConfig({
                visible: true,
                title: 'Error',
                message: 'Failed to generate report.',
                type: 'error',
                onClose: () => setAlertConfig({ visible: false })
            });
        } finally {
            setGenerating(false);
        }
    };

    // Graph Constants
    const chartHeight = 220;
    const chartWidth = width - 40; // padding 20 * 2
    const barWidth = 30;
    const spacing = (chartWidth - (barWidth * 6)) / 7;
    const maxVal = Math.max(...graphData.map(d => d.absentees), 5); // Minimum scale of 5

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="px-5 py-4 flex-row items-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color={isDark ? "white" : "#111827"} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Reports</Text>
            </View>

            <ScrollView className="flex-1 px-5 pt-6">

                {/* Date Selector */}
                <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex-row items-center justify-between mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <TouchableOpacity onPress={handlePreviousDay} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full">
                        <ChevronLeft size={20} color={isDark ? "white" : "#374151"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowDatePicker(true)} className="items-center">
                        <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase mb-1">Week Of</Text>
                        <View className="flex-row items-center">
                            <Calendar size={16} color={isDark ? "#60A5FA" : "#2563EB"} className="mr-2" />
                            <Text className="text-gray-900 dark:text-white font-bold text-base">{formatDate(selectedDate)}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleNextDay}
                        disabled={isNextDisabled()}
                        className={`p-2 rounded-full ${isNextDisabled() ? 'bg-gray-100 dark:bg-gray-800 opacity-50' : 'bg-gray-50 dark:bg-gray-700'}`}
                    >
                        <ChevronRight size={20} color={isDark ? "white" : "#374151"} />
                    </TouchableOpacity>
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        maximumDate={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChangeDate}
                    />
                )}

                {/* Year Selector */}
                <View className="mb-8">
                    <Text className="text-gray-900 dark:text-white font-bold text-lg mb-3">Select Year</Text>
                    <View className="flex-row gap-3">
                        {['1st Yr', '2nd Yr', '3rd Yr', '4th Yr', 'All'].map((year) => (
                            <TouchableOpacity
                                key={year}
                                onPress={() => setSelectedYear(year)}
                                className={`flex-1 py-3 rounded-xl items-center border ${selectedYear === year
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <Text className={`font-bold ${selectedYear === year ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                    {year === 'All' ? 'All' : year}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Graph Section */}
                <View className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Absentee Analysis</Text>
                    </View>

                    {loading ? (
                        <View className="h-[220px] justify-center items-center">
                            <ActivityIndicator size="large" color="#2563EB" />
                        </View>
                    ) : (
                        <View className="items-center">
                            <Svg height={chartHeight} width={chartWidth}>
                                {/* Grid Lines */}
                                {[0, 0.25, 0.5, 0.75, 1].map((factor, i) => {
                                    const y = chartHeight - 30 - (factor * (chartHeight - 60));
                                    return (
                                        <Line
                                            key={i}
                                            x1="0"
                                            y1={y}
                                            x2={chartWidth}
                                            y2={y}
                                            stroke={isDark ? "#374151" : "#E5E7EB"}
                                            strokeWidth="1"
                                            strokeDasharray="4, 4"
                                        />
                                    );
                                })}

                                {/* Bars */}
                                {graphData.map((item, index) => {
                                    const barHeight = (item.absentees / maxVal) * (chartHeight - 60);
                                    const x = spacing + (index * (barWidth + spacing));
                                    const y = chartHeight - 30 - barHeight;

                                    return (
                                        <G key={index}>
                                            <Rect
                                                x={x}
                                                y={y}
                                                width={barWidth}
                                                height={barHeight}
                                                fill={isDark ? "#60A5FA" : "#2563EB"} // blue-500 : blue-600
                                                rx="6"
                                            />
                                            {/* Count Label */}
                                            <SvgText
                                                x={x + barWidth / 2}
                                                y={y - 8}
                                                fill={isDark ? "#D1D5DB" : "#4B5563"}
                                                fontSize="12"
                                                fontWeight="bold"
                                                textAnchor="middle"
                                            >
                                                {item.absentees > 0 ? item.absentees : ''}
                                            </SvgText>
                                            {/* X-Axis Label */}
                                            <SvgText
                                                x={x + barWidth / 2}
                                                y={chartHeight - 10}
                                                fill={isDark ? "#9CA3AF" : "#6B7280"}
                                                fontSize="12"
                                                textAnchor="middle"
                                            >
                                                {item.day}
                                            </SvgText>
                                        </G>
                                    );
                                })}
                            </Svg>
                        </View>
                    )}
                </View>

                {/* Download Button */}
                <TouchableOpacity
                    onPress={handleDownloadPress}
                    disabled={generating}
                    className="w-full bg-blue-600 active:bg-blue-700 py-4 rounded-xl items-center flex-row justify-center mb-8 shadow-lg shadow-blue-500/30"
                >
                    {generating ? (
                        <ActivityIndicator color="white" className="mr-2" />
                    ) : (
                        <Download size={20} color="white" className="mr-2" />
                    )}
                    <Text className="text-white font-bold text-lg">
                        {generating ? 'Generating PDF...' : 'Download Absentee Report'}
                    </Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Global Alert */}
            {alertConfig.visible && (
                <AnimatedAlert
                    visible={alertConfig.visible}
                    title={alertConfig.title || ''}
                    message={alertConfig.message || ''}
                    type={alertConfig.type}
                    buttonText={alertConfig.buttonText}
                    showCancel={alertConfig.showCancel}
                    onClose={alertConfig.onClose || (() => setAlertConfig({ visible: false }))}
                    onCancel={alertConfig.onCancel}
                />
            )}
        </SafeAreaView>
    );
}
