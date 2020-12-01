// Imports for external dependencies
const { expect } = require('chai');

// Imports for internal dependencies
const Minion = require('../../../model/Minion');
const { uniqueMinions, minionPoolAtTier } = require('../../../service/minionService');

// Mocked Responses
const minionsDatabaseResponse = require('../../mockedResponses/db/minions');
const minionPoolAtTierOne = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierOne');
const minionPoolAtTierTwo = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierTwo');
const minionPoolAtTierThree = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierThree');
const minionPoolAtTierFour = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierFour');
const minionPoolAtTierFive = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierFive');
const minionPoolAtTierSix = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierSix');

// Mock jest
jest.mock('../../../db/connect');

beforeEach(() => {
    Minion.find = jest.fn().mockResolvedValue(minionsDatabaseResponse);
});

describe('Minion Service', () => {
    it('Unique Minions', async (done) => {
        const uniqueMinionsReturnValue = await uniqueMinions();
        let sum = 0;
        Object.keys(uniqueMinionsReturnValue).forEach((tavernTier) => {
            sum += uniqueMinionsReturnValue[tavernTier].length;
        });
        const expectedMinionTotal = await Minion.find();
        expect(sum).to.equal(expectedMinionTotal.length);
        done();
    });
    it('Minion Pool at Tier 1', async (done) => {
        const minionPoolAtTierOneReturnValue = await minionPoolAtTier('1');
        const tierOneMinions = [
            'Alleycat',
            'Deck Swabbie',
            'Scallywag',
            'Dragonspawn Lieutenant',
            'Fiendish Servant',
            'Micro Machine',
            'Micro Mummy',
            'Murloc Tidecaller',
            'Murloc Tidehunter',
            'Red Whelp',
            'Refreshing Anomaly',
            'Righteous Protector',
            'Rockpool Hunter',
            'Scavenging Hyena',
            'Sellemental',
            'Vulgar Homunculus',
            'Wrath Weaver'
        ];
        const tierOneCopies = 16;
        tierOneMinions.forEach((tierOneMinion) => {
            const amountOfMinion = minionPoolAtTierOneReturnValue.filter((minion) => minion.minionName === tierOneMinion).length;
            expect(amountOfMinion).to.equal(tierOneCopies);
        });
        expect(minionPoolAtTierOneReturnValue.length).to.equal(minionPoolAtTierOne.minions.length);
        done();
    });
    it('Minion Pool at Tier 2', async (done) => {
        const minionPoolAtTierTwoReturnValue = await minionPoolAtTier('2');
        const tierTwoMinions = [
            'Freedealing Gambler',
            'Glyph Guardian',
            'Harvest Golem',
            'Imprisoner',
            'Kaboom Bot',
            'Kindly Grandmother',
            'Metaltooth Leaper',
            'Molten Rock',
            'Murloc Warleader',
            'Nathrezim Overseer',
            'Old Murk-Eye',
            'Pack Leader',
            'Party Elemental',
            'Rabid Saurolisk',
            'Selfless Hero',
            'Southsea Captain',
            'Spawn of N\'Zoth',
            'Steward of Time',
            'Unstable Ghoul',
            'Menagerie Mug',
            'Waxrider Togwaggle',
            'Yo-Ho-Ogre'
        ];
        const tierTwoCopies = 15;
        tierTwoMinions.forEach((tierTwoMinion) => {
            const amountOfMinion = minionPoolAtTierTwoReturnValue.filter((minion) => minion.minionName === tierTwoMinion).length;
            expect(amountOfMinion).to.equal(tierTwoCopies);
        });
        expect(minionPoolAtTierTwoReturnValue.length).to.equal(minionPoolAtTierTwo.minions.length);
        done();
    });
    it('Minion Pool at Tier 3', async (done) => {
        const minionPoolAtTierThreeReturnValue = await minionPoolAtTier('3');
        const tierThreeMinions = [
            'Arcane Assistant',
            'Bloodsail Cannoneer',
            'Bronze Warden',
            'Coldlight Seer',
            'Crowd Favorite',
            'Crystalweaver',
            'Deflect-o-Bot',
            'Felfin Navigator',
            'Hangry Dragon',
            'Houndmaster',
            'Imp Gang Boss',
            'Iron Sensei',
            'Infested Wolf',
            'Khadgar',
            'Monstrous Macaw',
            'Piloted Shredder',
            'Rat Pack',
            'Replicating Menace',
            'Salty Looter',
            'Screwjank Clunker',
            'Shifter Zerus',
            'Soul Juggler',
            'Southsea Strongarm',
            'Stasis Elemental',
            'The Beast',
            'Crackling Cyclone',
            'Twilight Emissary'
        ];
        const tierThreeCopies = 13;
        tierThreeMinions.forEach((tierThreeMinion) => {
            const amountOfMinion = minionPoolAtTierThreeReturnValue.filter((minion) => minion.minionName === tierThreeMinion).length;
            expect(amountOfMinion).to.equal(tierThreeCopies);
        });
        expect(minionPoolAtTierThreeReturnValue.length).to.equal(minionPoolAtTierThree.minions.length);
        done();
    });
    it('Minion Pool at Tier 4', async (done) => {
        const minionPoolAtTierFourReturnValue = await minionPoolAtTier('4');
        const tierFourMinions = [
            'Annoy-o-Module',
            'Bolvar, Fireblood',
            'Cave Hydra',
            'Cobalt Scalebane',
            'Defender of Argus',
            'Drakonid Enforcer',
            'Floating Watcher',
            'Goldgrubber',
            'Herald of Flame',
            'Majordomo Executus',
            'Mechano-Egg',
            'Menagerie Jug',
            'Primalfin Lookout',
            'Ripsnarl Captain',
            'Security Rover',
            'Savannah Highmane',
            'Siegebreaker',
            'Toxfin',
            'Virmen Sensei',
            'Wildfire Elemental'
        ];
        const tierFourCopies = 11;
        tierFourMinions.forEach((tierFourMinion) => {
            const amountOfMinion = minionPoolAtTierFourReturnValue.filter((minion) => minion.minionName === tierFourMinion).length;
            expect(amountOfMinion).to.equal(tierFourCopies);
        });
        expect(minionPoolAtTierFourReturnValue.length).to.equal(minionPoolAtTierFour.minions.length);
        done();
    });
    it('Minion Pool at Tier 5', async (done) => {
        const minionPoolAtTierFiveReturnValue = await minionPoolAtTier('5');
        const tierFiveMinions = [
            'Annihilan Battlemaster',
            'Baron Rivendare',
            'Brann Bronzebeard',
            'Cap\'n Hoggarr',
            'Deadly Spore',
            'Ironhide Direhorn',
            'Junkbot',
            'King Bagurgle',
            'Lightfang Enforcer',
            'Mal\'Ganis',
            'Mama Bear',
            'Murozond',
            'Nat Pagle, Extreme Angler',
            'Nomi, Kitchen Nightmare',
            'Razorgore, the Untamed',
            'Seabreaker Goliath',
            'Sneed\'s Old Shredder',
            'Strongshell Scavenger',
            'Tavern Tempest',
            'Voidlord'
        ];
        const tierFiveCopies = 9;
        tierFiveMinions.forEach((tierFiveMinion) => {
            const amountOfMinion = minionPoolAtTierFiveReturnValue.filter((minion) => minion.minionName === tierFiveMinion).length;
            expect(amountOfMinion).to.equal(tierFiveCopies);
        });
        expect(minionPoolAtTierFiveReturnValue.length).to.equal(minionPoolAtTierFive.minions.length);
        done();
    });
    it('Minion Pool at Tier 6', async (done) => {
        const minionPoolAtTierSixReturnValue = await minionPoolAtTier('6');
        const tierSixMinions = [
            'Amalgadon',
            'Dread Admiral Eliza',
            'Foe Reaper 4000',
            'Gentle Djinni',
            'Ghastcoiler',
            'Imp Mama',
            'Kalecgos, Arcane Aspect',
            'Kangor\'s Apprentice',
            'Lieutenant Garr',
            'Lil\' Rag',
            'Maexxna',
            'Nadina the Red',
            'Zapp Slywick',
            'The Tide Razor',
            'Goldrinn, the Great Wolf'
        ];
        const tierSixCopies = 7;
        tierSixMinions.forEach((tierSixMinion) => {
            const amountOfMinion = minionPoolAtTierSixReturnValue.filter((minion) => minion.minionName === tierSixMinion).length;
            expect(amountOfMinion).to.equal(tierSixCopies);
        });
        expect(minionPoolAtTierSixReturnValue.length).to.equal(minionPoolAtTierSix.minions.length);
        done();
    });
});