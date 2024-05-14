export const buildRepOptions = (reps) => {
    const repOptions = []
    for (const [repId, rep] of Object.entries(reps)) {
        repOptions.push({
            name: rep.name,
            id: rep.user_id
        })
    }

    return repOptions
}