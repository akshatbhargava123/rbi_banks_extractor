const Axios = require('axios');
const { default: parse } = require('node-html-parser');
const axios = Axios.create();


const RBI_WEBSITE = 'https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=2070';

async function fetchIfUpdated() {
    // fetch and parse HTML
    const { data: html } = await axios.get(RBI_WEBSITE, { responseType: 'text' });
    const parsed = parse(html);

    // find the main tabl
    const elems = parsed.querySelectorAll('.tablebg');
    const mainTable = elems[1]; // assumption that main table will always be the second element

    // extract data in array format
    const rows = mainTable.childNodes;
    const dataRows = rows.map(row => {
        if (!row.childNodes.length) return null;

        const cols = row.childNodes;
        const dataCols = cols
            .map(col => col.text)
            .filter(val => val.trim().length > 0);

        return dataCols;
    }).filter(row => !!row).slice(1);

    // convert data to usable json format
    const json = dataRows.map(row => ({
        bankName: row[1],
        phoneInfo: row[2],
        email: row[3],
    }));

    return json;
}

fetchIfUpdated();
