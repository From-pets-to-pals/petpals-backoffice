describe('Utility Functions', () => {
    it('should add two numbers correctly', () => {
        const result = add(2, 3);
        expect(result).toBe(5); // Vérifie que la fonction additionne correctement
    });

    it('should always pass', () => {
        expect(true).toBeTrue(); // Test qui passe toujours
    });
});

function add(a: number, b: number): number {
    return a + b;
}

