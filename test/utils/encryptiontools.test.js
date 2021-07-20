const encryptionTools = require("../../src/utils/encryptiontools");

describe('Given a string', () => {
    it('It should encrypt it with the proper salt', () => {
        let encryptedPassword = encryptionTools.encrypt("test123");
        
        expect(encryptedPassword).not.toBeNull();
        expect(encryptedPassword).toBeDefined();
    });

    it('It should encrypt it with the proper salt with an empty string', () => {
        let encryptedPassword = encryptionTools.encrypt("");
        
        expect(encryptedPassword).not.toBe("");
        expect(encryptedPassword).toBeDefined();
    });

    it('It should encrypt and compare a string succesfully', async () => {
        let password = "test123";
        let encryptedPassword = encryptionTools.encrypt(password);
        let passwordComparison = await encryptionTools.compare(password, encryptedPassword);

        expect(passwordComparison).toBe(true);
    });

    it('It should fail to encrypt and compare a string', async () => {
        let password = "test123";
        let encryptedPassword = encryptionTools.encrypt("nottest123");
        let passwordComparison = await encryptionTools.compare(password, encryptedPassword);

        expect(passwordComparison).toBe(false);
    });
});