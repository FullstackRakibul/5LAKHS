import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export const generateCheckPDF = async (checkData) => {
  try {
    console.log("[v0] Starting PDF generation for check:", checkData.checkNumber)

    // Find the check template element
    const checkElement = document.querySelector(".check-template")
    if (!checkElement) {
      throw new Error("Check template not found")
    }

    console.log("[v0] Check element found, preparing for canvas conversion")

    const clonedElement = checkElement.cloneNode(true)
    clonedElement.style.position = "absolute"
    clonedElement.style.left = "-9999px"
    clonedElement.style.top = "0"
    document.body.appendChild(clonedElement)

    // Wait for any fonts to load
    await document.fonts.ready
    console.log("[v0] Fonts loaded, generating canvas")

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      width: 800,
      height: 350,
      logging: false,
      removeContainer: true,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        const clonedCheck = clonedDoc.querySelector(".check-template")
        if (clonedCheck) {
          // Apply explicit styles to avoid color parsing issues
          clonedCheck.style.backgroundColor = "#ffffff"
          clonedCheck.style.color = "#000000"
          clonedCheck.style.fontFamily = "'Courier New', monospace"

          // Convert all text colors to explicit values
          const allElements = clonedCheck.querySelectorAll("*")
          allElements.forEach((el) => {
            const computedStyle = window.getComputedStyle(el)
            if (computedStyle.color) {
              el.style.color = computedStyle.color
            }
            if (computedStyle.backgroundColor && computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)") {
              el.style.backgroundColor = computedStyle.backgroundColor
            }
            if (computedStyle.borderColor) {
              el.style.borderColor = computedStyle.borderColor
            }
          })
        }
      },
    })

    document.body.removeChild(clonedElement)
    console.log("[v0] Canvas generated successfully")

    // Create PDF in landscape orientation to fit check properly
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    // Calculate dimensions to fit the check properly on A4 landscape
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Standard check dimensions (approximately 8.5" x 3.5")
    const checkWidth = 216 // mm (8.5 inches)
    const checkHeight = 89 // mm (3.5 inches)

    // Center the check on the page
    const x = (pageWidth - checkWidth) / 2
    const y = (pageHeight - checkHeight) / 2

    console.log("[v0] Adding image to PDF")
    // Add the check image to PDF
    pdf.addImage(canvas.toDataURL("image/png", 1.0), "PNG", x, y, checkWidth, checkHeight, undefined, "FAST")

    // Add metadata
    pdf.setProperties({
      title: `Bank Check - ${checkData.checkNumber}`,
      subject: `Check for ${checkData.payeeName}`,
      author: checkData.accountHolder,
      creator: "Bank Check Generator",
    })

    // Generate filename with sanitized payee name
    const sanitizedPayeeName = checkData.payeeName.replace(/[^a-zA-Z0-9]/g, "_")
    const filename = `check_${checkData.checkNumber}_${sanitizedPayeeName}_${new Date().toISOString().split("T")[0]}.pdf`

    console.log("[v0] Saving PDF:", filename)
    // Download the PDF
    pdf.save(filename)

    console.log("[v0] PDF generation completed successfully")
    return true
  } catch (error) {
    console.error("[v0] PDF generation error:", error)
    throw error
  }
}

export const numberToWords = (num) => {
  if (num === 0) return "Zero"

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ]

  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

  const scales = ["", "Thousand", "Million", "Billion", "Trillion"]

  const convertHundreds = (n) => {
    let result = ""

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " Hundred"
      n %= 100
      if (n > 0) result += " "
    }

    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "")
    } else if (n > 0) {
      result += ones[n]
    }

    return result
  }

  if (num < 0) return "Negative " + numberToWords(-num)
  if (num < 20) return ones[num]
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
  if (num < 1000) return convertHundreds(num)

  let result = ""
  let scaleIndex = 0

  while (num > 0) {
    const chunk = num % 1000
    if (chunk !== 0) {
      const chunkWords = convertHundreds(chunk)
      if (scaleIndex > 0) {
        result = chunkWords + " " + scales[scaleIndex] + (result ? " " + result : "")
      } else {
        result = chunkWords
      }
    }
    num = Math.floor(num / 1000)
    scaleIndex++
  }

  return result
}

// Utility function to format currency amounts
export const formatCurrency = (amount, currency) => {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
  }

  const symbol = currencySymbols[currency] || currency
  return `${symbol}${amount.toLocaleString()}`
}

// Utility function to get currency names for amount in words
export const getCurrencyWords = (currency) => {
  const currencyNames = {
    USD: "Dollars",
    EUR: "Euros",
    GBP: "Pounds",
    INR: "Rupees",
    CAD: "Dollars",
    AUD: "Dollars",
    JPY: "Yen",
  }

  return currencyNames[currency] || "Dollars"
}
