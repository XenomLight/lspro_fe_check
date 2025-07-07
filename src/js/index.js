import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'

function formatDateToString(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return formattedDate;
}

function formatDateToInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
}

function formatJSONArrayToInput(jsonArray) {
    if (!jsonArray) return "";

    if (typeof jsonArray === "string") {
        try {
            jsonArray = JSON.parse(jsonArray);
        } catch (error) {
            return ""; // parsing gagal
        }
    }

    return jsonArray.join('\n');
}

function parseTextToJSONArray(textInput) {
    if (!textInput || typeof textInput !== 'string') return [];

    return textInput
        .split('\n')                // Pecah baris
        .map(item => item.trim())   // Hapus spasi berlebih
        .filter(item => item);      // Hilangkan baris kosong
}

function getFormattedDateTime() {
    const now = new Date();

    // Tambah offset WIB (UTC+7)
    const wibOffset = 7 * 60; // dalam menit
    const localTime = new Date(now.getTime() + (wibOffset - now.getTimezoneOffset()) * 60000);

    const year = localTime.getFullYear();
    const month = String(localTime.getMonth() + 1).padStart(2, '0');
    const date = String(localTime.getDate()).padStart(2, '0');
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const seconds = String(localTime.getSeconds()).padStart(2, '0');
    const milliseconds = String(localTime.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function isLoggedIn() {
    const token = localStorage.getItem("token");

    if (!token || token === "null") {
        localStorage.removeItem("token");
        return false;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
        localStorage.removeItem("token");
        return false;
    }

    try {
        const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        if (!payload.exp) {
            localStorage.removeItem("token");
            return false;
        }

        const now = Math.floor(Date.now() / 1000);
        if (payload.exp <= now) {
            localStorage.removeItem("token");
            return false;
        }

        return true;
    } catch (error) {
        localStorage.removeItem("token");
        return false;
    }
}

function downloadFile(blob, fileName) {
    saveAs(blob, fileName);
}

Alpine.plugin(persist);
window.Alpine = Alpine;

Alpine.magic('formatDateToString', () => formatDateToString)
Alpine.magic('formatDateToInput', () => formatDateToInput)
Alpine.magic('formatJSONArrayToInput', () => formatJSONArrayToInput)
Alpine.magic('parseTextToJSONArray', () => parseTextToJSONArray)
Alpine.magic('getFormattedDateTime', () => getFormattedDateTime)

window.apiHost = "http://localhost:4000/api"; // tanpa trailing slash
window.manajerTeknisReviewerId = 10;
window.katimSertifikasiReviewerId = 2;

window.formatDateToString = formatDateToString;
window.formatDateToInput = formatDateToInput;
window.formatJSONArrayToInput = formatJSONArrayToInput;
window.parseTextToJSONArray = parseTextToJSONArray;
window.getFormattedDateTime = getFormattedDateTime;
window.downloadFile = downloadFile;

window.swal = Swal;

window.isLoggedIn = isLoggedIn;

Alpine.start();