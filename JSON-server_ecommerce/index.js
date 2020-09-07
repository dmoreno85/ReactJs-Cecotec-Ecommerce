module.exports = () => {
    const data = { userClient: [] }
    for (let i = 0; i < 20; i++) {
      data.users.push({ id: i, email: `email${i}@gmail.com`,phone:666772840,city:`ciudad${i}`, })
    }
    return data
  }
