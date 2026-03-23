import { jsPDF } from 'jspdf'
import type { MealEntry } from '@/types/MealEntry'

export function generateMealPdf(entry: MealEntry): jsPDF {
  const doc = new jsPDF()
  let y = 20
  const lineHeight = 8
  const margin = 20
  const pageWidth = doc.internal.pageSize.getWidth()
  const maxWidth = pageWidth - margin * 2

  function addLabel(label: string, value: string | number) {
    const trimmed = typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').trim() : value
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(label + ':', margin, y)
    y += lineHeight * 0.7
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(String(trimmed), maxWidth)
    doc.text(lines, margin, y)
    y += lineHeight * lines.length + lineHeight * 0.5
  }

  function addDateTime(date: string, time: string, mealName: string) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(date + '\t' + time + '\t' + mealName, margin, y)
    y += lineHeight * 0.8
  }

  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Diário Alimentar', margin, y)
  y += lineHeight
  addDateTime(formatDate(entry.day), entry.time, entry.mealName)

  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)
  y += lineHeight

  addLabel('O que comeu/bebeu', entry.whatConsumed || '-')
  addLabel('Onde estava', entry.whereWas || '-')
  addLabel('Com quem', entry.withWho || '-')
  addLabel('O que sentiu antes', entry.feelingBefore || '-')
  addLabel('Nível de saciedade antes', `${entry.satietyLevelBefore}/10`)
  addLabel('O que sentiu durante', entry.feelingDuring || '-')
  addLabel('O que sentiu depois', entry.feelingAfter || '-')
  addLabel('Nível de saciedade depois', `${entry.satietyLevelAfter}/10`)
  addLabel('Anotações', entry.notes || '-')

  return doc
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '-'
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

export async function sharePdf(doc: jsPDF, entry: MealEntry): Promise<boolean> {
  const fileName = getFileName(entry.day, entry.time)
  const blob = doc.output('blob')
  const file = new File([blob], fileName, { type: 'application/pdf' })

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] })
      return true
    } catch {
      return false
    }
  }
  doc.save(fileName)
  return false
}

function getFileName(day: string, time: string): string {
  const datePart = day.replace(/-/g, '')
  const timePart = time.replace(':', '')
  return `diario-alimentar-${datePart}-${timePart}.pdf`
}
