export function getFullVacationQuery(): string {
    const query = `SELECT 
    locations.*,                    
    COUNT(followers.iduser) AS followers_count
FROM 
    vacations.locations
JOIN 
    vacations.followers 
ON 
    vacations.locations.id = vacations.followers.idlocation
GROUP BY 
    vacations.locations.id;   `
    return query;
}