const GetTextReading = async (file1, file2) => {

    const readParagraph = () => {
        return new Promise((resolve, reject) => {

            const exportData = file1.replace(/\.\n/g, '')
                .replace(/(\r\n)|(\n)/g, "\n")
                .replace(/(\([0-9][0-9]\))(\s[^_])/g, '$1 ___ $2');
            resolve(exportData);

        }
        )
    }
    const readSelections = () => {
        return new Promise((resolve, reject) => {
            const arr1 = file2.replace(/\r/g, '').split('\n');
            const arr = arr1.filter(item => item !== '');
            const exportData = [];
            for (let i = 0; i < arr.length; i += 6) {
                exportData.push({
                    index: arr[i],
                    selections: [
                        arr[i + 1], arr[i + 2], arr[i + 3], arr[i + 4]
                    ],
                    answer: arr[i + 5]
                });
            }
            resolve(exportData);
        }
        )
    }
    let allData = {};
    await Promise.all([readParagraph(), readSelections()])
        .then((values) => allData = {
            paragraph: values[0],
            questions: values[1]
        })
        .catch(error => console.log(error.message));
    return allData;
}
export default GetTextReading;