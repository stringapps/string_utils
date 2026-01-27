frappe.ui.form.on('Customer', {
    refresh(frm) {
        frm.add_custom_button(__('New Prescription'), function() {
            frappe.new_doc('Prescription', {
                customer: frm.doc.name
            });
        });
        frm.add_custom_button(__('View Prescriptions'), function() {
            frappe.set_route('List', 'Prescription', { customer: frm.doc.name });
        });
    },
});