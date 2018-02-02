const measure = 'tilesPerformance';
const markStart = `${measure}-start`;
const markEnd = `${measure}-end`;

export default {
    start: () => {
        performance.mark(markStart);
    },
    end: () => {
        performance.mark(markEnd);
        performance.measure(measure, markStart, markEnd);
    },
    getEntries: () => performance.getEntriesByName(measure),
    clearEntries: () => performance.clearMeasures(measure),
};
