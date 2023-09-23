export const avatarText = (name) => {
    return name.split(" ").length > 1
        ? (name.split(" ")[0][0] + name.split(" ")[1][0]).toUpperCase()
        : name.length > 1 ? name.slice(0, 2).toUpperCase() : name.slice(0, 1).toUpperCase()
}