
export const getCustomData = (request , response) => {
    const { min = 100 , max = 10 } = request.body;

    const y = +((Math.random() * (max - min) + min).toFixed(2));
    const x = +((Math.random() * (max - min) + min).toFixed(2));

    return response.status(200).json({
        status: true,
        data: {
            x: x,
            y: y
        }
    })
}