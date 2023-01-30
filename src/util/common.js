export const toUSD = (cents) => {
    if (!cents) return ""
    return (Number(cents) / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export const abv = (text) => {
    let temp = text
        .replace("a few seconds ago", "5s")
        .replace("a minute ago", "1m")
        .replace(" seconds ago", "s")
        .replace(" hours ago", "h")
        .replace(" minutes ago", "m")
        .replace(" days ago", "d")
        .replace(" months ago", "months")
    return temp
}