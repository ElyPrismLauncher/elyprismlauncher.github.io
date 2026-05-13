const pinecone_version = get_release_version_formatted("ElyPrismLauncher", "Launcher")
    .then(x => manipulate_element(x, "pinecone-version"));
const freesm_version = get_release_version_formatted("FreesmTeam", "FreesmLauncher")
    .then(x => manipulate_element(x, "freesm-version"));
const fjord_version = get_release_version_formatted("unmojang", "FjordLauncher")
    .then(x => manipulate_element(x, "fjord-version"));
const shattered_version = get_release_version_formatted("Noctilune", "ShatteredPrism")
    .then(x => manipulate_element(x, "shattered-version"));
const poly_version = get_release_version_formatted("PolyMC", "PolyMC")
    .then(x => manipulate_element(x, "poly-version"));

function manipulate_element(x, id) {
    const element = document.getElementById(id);

    const date = new Date(x[1]).toLocaleDateString();
    element.innerHTML = `${x[0]}<br><small>${date}</small>`

    const now = Date.now() / 1000;
    const then = x[1] / 1000;

    if ((now - then) <= 7776000) /* 90 days */ {
        element.style.backgroundColor = "var(--green-1)";
    } else if ((now - then) <= 31104000) /* 360 days */ {
        element.style.backgroundColor = "var(--yellow-1)";
    } else {
        element.style.backgroundColor = "var(--red-1)";
    }
}

await Promise.allSettled([pinecone_version, freesm_version, fjord_version, shattered_version, poly_version])