const owner = "ElyPrismLauncher";
const repo = "Launcher";

async function get_release_version_formatted(owner, repo) {
    if (get_cookie_value(`${owner}_${repo}_tag`) === undefined
        || get_cookie_value(`${owner}_${repo}_ts`) === undefined) {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);

        const data = await res.json();
        const timestamp = Date.parse(data.published_at);

        document.cookie = `${owner}_${repo}_tag=${data.tag_name};max-age=86400`;
        document.cookie = `${owner}_${repo}_ts=${timestamp};max-age=86400`;
    }

    return [get_cookie_value(`${owner}_${repo}_tag`), Number(get_cookie_value(`${owner}_${repo}_ts`))];
}

async function fetch_release_version(owner, repo) {
    const json = await (await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`)).json();
    return json.tag_name;
}

function get_cookie_value(name) {
    return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}