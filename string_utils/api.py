import frappe
from frappe.utils.print_format import download_pdf



@frappe.whitelist()
def get_pdf(
	doctype: str,
	name: str,
	print_format: str | None = None,
	language: str | None = None,
	letterhead: str | None = None,
):
	doc = frappe.get_doc(doctype, name)

	download_pdf(
		doc.doctype,
		doc.name,
		print_format,
		doc=doc,
		language=language,
		letterhead=letterhead or None,
	)