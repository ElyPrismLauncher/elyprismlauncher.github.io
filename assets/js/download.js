const download_a_element = document.getElementById("download-link");
const download_span_element = document.getElementById("download-span");

function detectOS() {
    const ua = navigator.userAgent.toLowerCase();
    const p = navigator.platform.toLowerCase();

    if (ua.includes("windows") || p.includes("win")) {
        return "windows";
    }
    if (ua.includes("mac") || p.includes("mac")) {
        return "macos";
    }
    return "linux";
}

document.getElementById("github-api-link").href = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

const version = await get_release_version_formatted(owner, repo, true);
console.log(version);
document.getElementById("version").innerText = version;

const baseurl = `https://github.com/${owner}/${repo}/releases/download/${version}`

const os = detectOS();
if (os === "windows") {
    download_a_element.href = `${baseurl}/PineconeMC-Windows-MSVC-Setup-${version}.exe`;
    download_span_element.innerHTML = "<small>Windows<sup>x64, MSVC</sup></small> Setup";
} else if (os === "macos") {
    download_a_element.href = `${baseurl}/PineconeMC-macOS-${version}.dmg`;
    download_span_element.innerHTML = "<small>macOS</small> Disk Image";
} else {
    download_a_element.href = `${baseurl}/PineconeMC-Linux-x86_64.AppImage`;
    download_span_element.innerHTML = "<small>Linux<sup>x64</sup></small> AppImage";
}

document.getElementById("linux-64-appimage").href = `${baseurl}/PineconeMC-Linux-x86_64.AppImage`;
document.getElementById("linux-64-portable").href = `${baseurl}/PineconeMC-Linux-Qt6-Portable-${version}.tar.gz`;
document.getElementById("linux-arm-appimage").href = `${baseurl}/PineconeMC-Linux-aarch64.AppImage`;
document.getElementById("linux-arm-portable").href = `${baseurl}/PineconeMC-Linux-aarch64-Qt6-Portable-${version}.tar.gz`;
document.getElementById("macos-dmg").href = `${baseurl}/PineconeMC-macOS-${version}.dmg`;
document.getElementById("macos-zip").href = `${baseurl}/PineconeMC-macOS-${version}.zip`;
document.getElementById("mingw-64-setup").href = `${baseurl}/PineconeMC-Windows-MinGW-w64-Setup-${version}.exe`;
document.getElementById("mingw-64-portable").href = `${baseurl}/PineconeMC-Windows-MinGW-w64-Portable-${version}.zip`;
document.getElementById("mingw-arm-setup").href = `${baseurl}/PineconeMC-Windows-MinGW-arm64-Setup-${version}.exe`;
document.getElementById("mingw-arm-portable").href = `${baseurl}/PineconeMC-Windows-MinGW-arm64-Portable-${version}.zip`;
document.getElementById("msvc-64-setup").href = `${baseurl}/PineconeMC-Windows-MSVC-Setup-${version}.exe`;
document.getElementById("msvc-64-portable").href = `${baseurl}/PineconeMC-Windows-MSVC-Portable-${version}.zip`;
document.getElementById("msvc-arm-setup").href = `${baseurl}/PineconeMC-Windows-MSVC-arm64-Setup-${version}.exe`;
document.getElementById("msvc-arm-portable").href = `${baseurl}/PineconeMC-Windows-MSVC-arm64-Portable-${version}.zip`;