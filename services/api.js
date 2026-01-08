import { API_BASE_URL } from '../constants/config';

const fetchWithTimeout = async (resource, options = {}) => {
    const { timeout = 15000 } = options; // Increased to 15s
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError' || error.message.includes('Aborted')) {
            throw new Error('Network request timed out. Please check your connection and API URL.');
        }
        throw error;
    }
};

const safeFetch = async (url, options = {}) => {
    const method = options.method || 'GET';
    console.log(`[API REQUEST] ${method} ${url}`);
    if (options.body) console.log(`[API BODY]`, options.body);

    try {
        const response = await fetchWithTimeout(url, options);
        const text = await response.text();

        console.log(`[API RESPONSE] ${method} ${url} -> ${response.status}`);
        // console.log(`[API DATA]`, text.substring(0, 100) + '...'); // logging first 100 chars

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            // Ignore parse error here, handle below
        }

        if (!response.ok) {
            const errorMessage = (data && data.message)
                ? data.message
                : (text || `Request failed with status ${response.status}`);
            throw new Error(errorMessage);
        }

        if (data === undefined) {
            console.error('[API] Parse Error:', text);
            throw new Error(`Invalid Server Response (${response.status})`);
        }

        return data;
    } catch (error) {
        console.warn(`[API WARN] ${method} ${url}:`, error.message);
        throw error;
    }
};

export const api = {
    // Common
    login: (email, password, role) => safeFetch(`${API_BASE_URL}/common/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
    }),

    getUser: (id) => safeFetch(`${API_BASE_URL}/common/user/${id}`),

    // Student
    getStudentStats: (id) => safeFetch(`${API_BASE_URL}/student/stats/${id}`),

    getStudentTimetable: (id) => safeFetch(`${API_BASE_URL}/student/timetable/${id}`),

    getStudentHistory: (id) => safeFetch(`${API_BASE_URL}/student/history/${id}`),

    getStudentUpcoming: (id) => safeFetch(`${API_BASE_URL}/student/upcoming/${id}`),

    // Faculty
    getFacultyCourses: (id) => safeFetch(`${API_BASE_URL}/faculty/courses/${id}`),

    getFacultyTimetable: (id) => safeFetch(`${API_BASE_URL}/faculty/timetable/${id}`),

    getCourseStudents: (courseId) => safeFetch(`${API_BASE_URL}/faculty/students/${courseId}`),

    getAllFacultyStudents: (facultyId) => safeFetch(`${API_BASE_URL}/faculty/all-students/${facultyId}`),

    markAttendance: (data) => safeFetch(`${API_BASE_URL}/faculty/mark-attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }),

    // Admin
    getAdminStats: (year) => safeFetch(`${API_BASE_URL}/admin/stats${year ? `?year=${year}` : ''}`),

    getAdminStudents: () => safeFetch(`${API_BASE_URL}/admin/students`),

    getAdminFaculty: () => safeFetch(`${API_BASE_URL}/admin/faculty`), // NEW METHOD

    addStudent: (studentData) => safeFetch(`${API_BASE_URL}/admin/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
    }),

    addFaculty: (facultyData) => safeFetch(`${API_BASE_URL}/admin/faculty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facultyData)
    }),

    deleteStudent: (id) => safeFetch(`${API_BASE_URL}/admin/students/${id}`, {
        method: 'DELETE'
    }),

    deleteFaculty: (id) => safeFetch(`${API_BASE_URL}/admin/faculty/${id}`, {
        method: 'DELETE'
    }),

    markFacultyAttendance: (data) => safeFetch(`${API_BASE_URL}/admin/faculty/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) // { date, records: [{ faculty_id, status }] }
    }),

    changePassword: (userId, currentPassword, newPassword) => safeFetch(`${API_BASE_URL}/common/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
    }),

    updateProfile: (userId, data) => safeFetch(`${API_BASE_URL}/common/update-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...data }),
    }),

    getWeeklyAbsentees: (date, year) => safeFetch(`${API_BASE_URL}/admin/reports/weekly-absentees?date=${date}&year=${year}`),

    getDailyReport: (date, year) => safeFetch(`${API_BASE_URL}/admin/reports/daily-stats-detail?date=${date}&year=${year}`),
};
