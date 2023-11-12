export const calcluateScore = (rowData) => {
    const total = Number(rowData.출석점수) + Number(rowData.과제점수) + Number(rowData.중간고사) + Number(rowData.기말고사);
    let grade;

    if(total> 95){
        grade = "A+";
    }
    else if (95>=total && total >90) {
        grade="A0";
    }
    else if (90>=total && total >85) {
        grade="B+";
    }
    else if (85>=total && total >80) {
        grade="B0";
    }
    else if (80>=total && total > 75) {
        grade="C+";
    }
    else if (75>=total && total >70) {
        grade="C0";
    }
    else if (70>=total && total >65) {
        grade="D+";
    }
    else if (65>=total && total >60) {
        grade="D0";
    }
    else{
        grade="F";
    }


    return{
        ...rowData,
        총점: total,
        성적: grade
    };

}