async function fetch_version(owner, repo) {
    if (get_cookie_value(`${owner}_${repo}_tag`) === undefined
        || get_cookie_value(`${owner}_${repo}_ts`) === undefined) {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);

        const data = await res.json();
        const timestamp = Date.parse(data.published_at);

        document.cookie = `${owner}_${repo}_tag=${data.tag_name};max-age=86400`;
        document.cookie = `${owner}_${repo}_ts=${timestamp};max-age=86400`;
    }

    const tag = get_cookie_value(`${owner}_${repo}_tag`);

    const ms = get_cookie_value(`${owner}_${repo}_ts`);

    return [tag, Number(ms)];
}

function get_cookie_value(name) {
    return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}