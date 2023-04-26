export const wait = val => {
    return new Promise(resolve => setTimeout(resolve, val));
}

export const padNumber = number => {
    return `${number}`.padStart(2, '0');
}

export const calculateScore = (oldScore, newScore, weight) => {
    let score = 'No change detected.';
    /*console.log('oldScore', (oldScore))
    console.log('newScore', (newScore))
    console.log('weight', weight)*/
    if (oldScore != newScore) {
        //console.log('weight',weight)
        score = parseFloat((((parseFloat(newScore.toFixed(2)) - parseFloat(oldScore.toFixed(2))) * weight)).toFixed(2));
    }
    //console.log('scorescorescore', score);
    return score;
}

export const getWeightage = (auditRefArray, catId) => {
    const scoreObj = auditRefArray.filter(item => item.id === catId);
    return scoreObj[0]['weight'];
}