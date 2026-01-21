frappe.ui.form.on('Sales Invoice', {
	refresh(frm) {
		///////////////////
        frm.add_custom_button(
				__("Download PDF"),
				() => {
					frappe.prompt(
						[
							{
								fieldtype: "Section Break",
								label: "Print Settings",
								fieldname: "print_settings",
								
							},
							{
								fieldtype: "Link",
								label: "Print Format",
								fieldname: "print_format",
								options: "Print Format",
								placeholder: "Standard",
								get_query: () => {
									return {
										filters: {
											doc_type: "Sales Invoice",
										},
									};
								},
							},
							{
								fieldtype: "Link",
								label: "Language",
								fieldname: "language",
								options: "Language",
								default: frappe.boot.lang,
							},
							{
								fieldtype: "Link",
								label: "Letter Head",
								fieldname: "letter_head",
								options: "Letter Head",
								default: frm.doc.letter_head,
							},
						],
						(data) => {
							var w = window.open(
								frappe.urllib.get_full_url(
									"/api/method/string_utils.api.download_pdf?" +
										new URLSearchParams({
										    doctype:frm.doc.doctype,
										    name: frm.doc.name,
											print_format: data.print_format || "Standard",
											language: data.language || frappe.boot.lang,
											letterhead: data.letter_head || frm.doc.letter_head || "",
										}).toString()
								)
							);
							if (!w) {
								frappe.msgprint(__("Please enable pop-ups"));
								return;
							}
						},
						__("Download PDF"),
						__("Download")
					);
				},
			);
        ///////////////////
	}
})