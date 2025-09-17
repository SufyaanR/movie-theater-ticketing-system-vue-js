import html2pdf from "html2pdf.js";

function exportToPDF (elementId, fileName) {
    const element = document.getElementById(elementId);
    const now = new Date();

    const options = {
        margin: 0,
        filename: `${fileName}_${now}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 }, // higher scale = sharper text/images
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ['avoid-all'] }
    };

    html2pdf().set(options).from(element).save();
}

export default{
    exportToPDF
};