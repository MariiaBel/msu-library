import { msuClient } from "@/01_app/api/client.js"
import { getAllDocumentsResourcesGet, searchDocumentSearchGet, downloadFileFromS3GetFileLinkGet } from "@/01_app/api/client/services.gen"
import store from "@/01_app/Store.js"

// we need this type for document table 
// { file: "Теоремы и задачи функана Кириллов Гвишиани.pdf", discipline: "Функциональный анализ", type: "Литература", year: 1988, author: "", download: `` },

/**
 * @typedef Document
 * @property { string } file
 * @property { string } discipline
 * @property { string } type
 * @property { number } years
 * @property { string } author
 * @property { string } download
 * @property { boolean } is_file
 */

/**
 * 
 * @returns { Array<Document> } Documents for catalog table {@link Document}
 */
export const getAllDocumentsToTable = async() => {
    const filterQuery = {
        subjectArray: store.subject.size ? store.getFilterArrByKey('subject').join(',') : '',
        semesterArray: store.semester.size ? store.getFilterArrByKey('semester').join(',') : '',
        teacherArray: store.teacher.size ? store.getFilterArrByKey('teacher').join(',') : '',
        subjectTypeArray: store.category.size ? store.getFilterArrByKey('category').join(',') : '',
    }
    const { data } = await getAllDocumentsResourcesGet({
        client:msuClient,
        query: {
            ...filterQuery
        }
    })
    const mappedData = data.map((document) => ({
        file: document.name, 
        discipline: document.subject_name, 
        type: document.category_name, 
        year: document.year, 
        author: document.teacher_name, 
        is_file: document.is_file,
        document_id: document.document_id,
        link: document.link
    }))
    
    return mappedData
}

/**
 * @param {string} searchValue for prompt
 * @returns { Array<Document> } Documents for catalog table {@link Document}
 */

 export const getSearchedDocumentsToTable = async() => {
    const filterQuery = {
        subjectArray: store.subject.size ? store.getFilterArrByKey('subject').join(',') : '',
        semesterArray: store.semester.size ? store.getFilterArrByKey('semester').join(',') : '',
        teacherArray: store.teacher.size ? store.getFilterArrByKey('teacher').join(',') : '',
        subjectTypeArray: store.category.size ? store.getFilterArrByKey('category').join(',') : '',
    }
    
    const { data } = await searchDocumentSearchGet({
        client:msuClient, 
        query: {
            prompt: store.search,
            ...filterQuery
        }

    })
    const mappedData = data.map((document) => ({
        file: document.name, 
        discipline: document.subject_name, 
        type: document.category_name, 
        year: document.year, 
        author: document.teacher_name, 
        is_file: document.is_file,
        document_id: document.document_id,
        link: document.link
    }))
    
    return mappedData
}

export const getFileByLink = async(link) => {
    const { data } = await downloadFileFromS3GetFileLinkGet({
        client:msuClient, 
        path: {
            link: link
        }
    })
    downloadBlob(data, link)
}

const downloadFileByURL = (fileURL) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = fileURL.split('/').pop();
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function downloadBlob(blob, name = 'document.pdf') {
    if (
      window.navigator && 
      window.navigator.msSaveOrOpenBlob
    ) return window.navigator.msSaveOrOpenBlob(blob);

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
}
