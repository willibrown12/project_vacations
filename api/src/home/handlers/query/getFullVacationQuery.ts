export function getFullVacationQuery(): string {
    const query = `SELECT country , city , image_url FROM vacations.locations;`
    return query;
}