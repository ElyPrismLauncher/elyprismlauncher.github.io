const owner = "ElyPrismLauncher";
const repo = "Launcher";
const fallback_tag = "11.1.0";

async function get_release_version(owner, repo, getPineconeTag = false) {
    if (get_cookie_value(`${owner}_${repo}_tag`) === undefined
        || get_cookie_value(`${owner}_${repo}_ts`) === undefined) {

        let res;
        try {
            res = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
                {signal: AbortSignal.timeout(3000)}
            );
        } catch (err) {
            console.warn(err);
        }

        if (res !== undefined && res.status === 200) {
            const data = await res.json();
            const timestamp = Date.parse(data.published_at);

            document.cookie = `${owner}_${repo}_tag=${data.tag_name};max-age=86400`;
            document.cookie = `${owner}_${repo}_ts=${timestamp};max-age=86400`;
        }
    }

    if (getPineconeTag) {
        if (get_cookie_value(`${owner}_${repo}_tag`) === undefined) {
            document.getElementById("fallback").innerText = fallback_tag;
            document.getElementById("fallback").href = `https://github.com/${owner}/${repo}/releases/${fallback_tag}`
            document.getElementById("github-latest").href = `https://github.com/${owner}/${repo}/releases/latest`
            document.getElementById("fallback-popup").style.display = "block";
            document.getElementById("fetching-from-label").style.textDecoration = "line-through";
            return [fallback_tag];
        }

        return [get_cookie_value(`${owner}_${repo}_tag`)];
    }

    return [get_cookie_value(`${owner}_${repo}_tag`), Number(get_cookie_value(`${owner}_${repo}_ts`))];
}

function get_cookie_value(name) {
    return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}
