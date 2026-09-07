export function formatDate(date: Date | string | null): string {
    if (!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString("en-SG", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function formatDateISO(date: Date): string {
    return date.toISOString().split("T")[0];
}

export function formatDateYYYYMmDd(date: Date | null): string {
    if (!date) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}