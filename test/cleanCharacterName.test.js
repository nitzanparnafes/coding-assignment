const TmdbProvider = require("../src/services/providers/tmdbProvider");

describe("TmdbProvider", () => {
    test("cleanCharacterName should remove parentheses", () => {
        expect(TmdbProvider.cleanCharacterName("Iron Man (Tony Stark)")).toBe("Iron Man");
    })
    test("cleanCharacterName should remove dashes", () => {
        expect(TmdbProvider.cleanCharacterName("Spider-Man")).toBe("Spider Man");
    })
})