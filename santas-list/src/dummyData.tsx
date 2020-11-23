export type Gift = Array<string | number>;
export type Recipient = Array<string | number | Gift>;
export type Listing = Array<string | Recipient[]>;
export type User = Array<string | Listing[]>;

const idU1: string = "11";

const nameU1: string = "maryjane";

const pswdHashU1: string = "0x123";

const idR1: string = "21";
const idR2: string = "22";
const idR3: string = "23";
const idR4: string = "24";
const idR5: string = "25";
const idR6: string = "26";
const idR7: string = "27";
const idR4_1: string = "28";

const nameR1: string = "aunt Bridget";
const nameR2: string = "cousin Dave";
const nameR3: string = "Emilia Fitzgerald";
const nameR4: string = "Gyda Haraldsdottir";
const nameR5: string = "Ilda June";
const nameR6: string = "Karl Leeds";
const nameR7: string = "mom";

const noteR1: string = "-won't appreciate anything anyway, don't bother too much\n-maybe handmade lavender soap?";
const noteR2: string = "Anything with Paw Patrol. Maybe a colouring book or plushie?";
const noteR3: string = "Likes to wear shawls with pins. Also broches.";
const noteR4: string = "";
const noteR5: string = "loves homely knick-knacks - maybe something wooden with a quote about home?";
const noteR6: string = "No idea - consult with Nick?";
const noteR7: string = "She loves knitting and has mentioned some accessories - possibly stitch markers or a yarn bowl? Or maybe yarn from indie dyer?";
const noteR4_1: string = "Asked for herb grinders for her new apartment.";

const budgetR1: number = 123;
const budgetR2: number = 0;
const budgetR3: number = 1230;
const budgetR4: number = 1230;
const budgetR5: number = 123;
const budgetR6: number = 123;
const budgetR7: number = 123;
const budgetR4_1: number = 4567;

const nameL1: string = "Christmas 2020";
const nameL2: string = "Gyda's 23rd birthday"

const idL1: string = "31";
const idL2: string = "32";

const idG1: string = "41";
const idG2: string = "42";
const idG3: string = "43";
const idG7: string = "47";
const idG8: string = "48";

const nameG1: string = "Purple Lavender goat milk soap, tiny flower bars";
const nameG2: string = "Paw Patrol Themed Custom Coloring Books";
const nameG3: string = "Shawl Pin 2pc wood with decorative carved leaf wooden stick";
const nameG7: string = "Hand Dyed Yarn \"Mermaid Tales\" Superwash Yarn Merino Wool Teal and Blue Variegated";
const nameG8: string = "Rainbow Colored Herb Grinders- 4 sizes to choose from- 4 pc grinder w/magnetic lid, filter and base";

const priceG1: number = 24;
const priceG2: number = 280;
const priceG3: number = 340;
const priceG7: number = 650;
const priceG8: number = 232;

{/*Gift: {ID, name, price, recipientID}*/}
export const gift1: Gift = [idG1, nameG1, priceG1, idR1];
export const gift2: Gift = [idG2, nameG2, priceG2, idR2];
export const gift3: Gift = [idG3, nameG3, priceG3, idR3];
export const gift7: Gift = [idG7, nameG7, priceG7, idR7];
export const gift8: Gift = [idG8, nameG8, priceG8, idR4_1];

{/*Recipient: {ID, name, listingId, note, budget, gift - optional} */}
export const recipient1: Recipient = [idR1, nameR1, idL1, noteR1, budgetR1, gift1];
export const recipient2: Recipient = [idR2, nameR2, idL1, noteR2, budgetR2, gift2];
export const recipient3: Recipient = [idR3, nameR3, idL1, noteR3, budgetR3, gift3];
export const recipient4: Recipient = [idR4, nameR4, idL1, noteR4, budgetR4];
export const recipient5: Recipient = [idR5, nameR5, idL1, noteR5, budgetR5];
export const recipient6: Recipient = [idR6, nameR6, idL1, noteR6, budgetR6];
export const recipient7: Recipient = [idR7, nameR7, idL1, noteR7, budgetR7, gift7];
export const recipient8: Recipient = [idR4_1, nameR4, idL2, noteR4_1, budgetR4_1, gift8];

{/*Listing: {ID, name, recipients[]} */}
export const listing1: Listing = [idL1, nameL1, [recipient1, recipient2, recipient3, recipient4, recipient5, recipient6, recipient7]];
export const listing2: Listing = [idL2, nameL2, [recipient8]];

{/*User: {ID, name, pswdHash, listings[]} */}
export const user1: User = [idU1, nameU1, pswdHashU1, [listing1, listing2]];