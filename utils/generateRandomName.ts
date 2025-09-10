const firstNames = [
  "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas",
  "Mary", "Jennifer", "Linda", "Patricia", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen", "Nancy"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "García", "Rodriguez", "Martínez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
];

export function generatePersonName(): string {
    const firstName = firstNames[Math.floor(Math.random()) * firstNames.length]
    const lastName = lastNames[Math.floor(Math.random()) * lastNames.length]

  return `${firstName} ${lastName}`;
}