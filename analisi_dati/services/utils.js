// This file contains utility functions that can be reused across the application.

export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}