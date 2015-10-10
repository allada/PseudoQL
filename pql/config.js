export class Config {
    static ALL_ARGS (args) {
        return args.join(', ');
    };
}
/* Database types */
Config.NUMERIC       = {
    is_numeric: true,
};
Config.DATE          = {
    is_numeric: false,
};
Config.STRING        = {
    is_numeric: false,
};
Config.BOOLEAN       = {
    is_numeric: true,
};
Config.ANY_TYPE      = {
    is_numeric: false,
};

/* These are to make it easier to read the code for the function definitions */
Config.ARG1          = 0;
Config.ARG2          = 1;
Config.ARG3          = 2;
Config.ARG4          = 3;
Config.ARG5          = 4;
Config.ARG6          = 5;
Config.ARG7          = 6;
Config.ARG8          = 7;
Config.DB_MAP        = 
{"bill":{"name":"bills","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"invoice_number":{"type":Config.STRING},"purchase_id":{"type":Config.NUMERIC},"invoice_date":{"type":Config.DATE},"notes":{"type":Config.STRING},"payment_status":{"type":Config.NUMERIC},"term_id":{"type":Config.NUMERIC},"due_date":{"type":Config.DATE},"accounting_system_id":{"type":Config.STRING},"vendor_id":{"type":Config.NUMERIC},"effective_date":{"type":Config.DATE},"invoice_amount":{"type":Config.NUMERIC},"shipping_cost":{"type":Config.NUMERIC},"discount_amount":{"type":Config.NUMERIC},"tax_amount":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"date_closed":{"type":Config.DATE},"currency":{"type":Config.STRING},"type":{"type":Config.STRING}},"linkTo":{"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"}},"linkFrom":{"shipment":{"table":"shipment","pql":"eq(shipment.bill_id,id)"},"product_items_bills":{"table":"product_items_bills","pql":"eq(product_items_bills.bill_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Bill\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Bill\")"}}},"booking":{"name":"bookings","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"ship_attn":{"type":Config.STRING},"ship_name":{"type":Config.STRING},"ship_address1":{"type":Config.STRING},"ship_address2":{"type":Config.STRING},"ship_city":{"type":Config.STRING},"ship_state":{"type":Config.STRING},"ship_zip":{"type":Config.STRING},"ship_country":{"type":Config.STRING},"brand_id":{"type":Config.NUMERIC},"date":{"type":Config.DATE},"customer_po":{"type":Config.STRING},"sales_rep_id":{"type":Config.NUMERIC},"total":{"type":Config.NUMERIC}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"sales_rep":{"table":"sales_rep","pql":"eq(sales_rep_id,sales_rep.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Booking\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Booking\")"}}},"brand":{"name":"brands","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"notes":{"type":Config.STRING},"primary_contact_id":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"brand_names":{"type":Config.STRING},"parent_id":{"type":Config.NUMERIC},"active":{"type":Config.BOOLEAN},"website":{"type":Config.STRING},"temp_mybooks_id":{"type":Config.NUMERIC},"warehouse_use_vendor_num":{"type":Config.BOOLEAN}},"linkTo":{"primary_contact":{"table":"contact","pql":"eq(primary_contact_id,primary_contact.id)"},"parent":{"table":"brand","pql":"eq(parent_id,parent.id)"}},"linkFrom":{"contacts":{"table":"contact","pql":"eq(contacts.brand_id,id)"},"products":{"table":"product","pql":"eq(products.brand_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Brand\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Brand\")"}}},"carrier":{"name":"carriers","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"scac_code":{"type":Config.STRING}},"linkTo":[],"linkFrom":{"shipment_methods":{"table":"shipment_method","pql":"eq(shipment_methods.carrier_id,id)"}}},"contact":{"name":"contacts","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"last_name":{"type":Config.STRING},"address1":{"type":Config.STRING},"address2":{"type":Config.STRING},"city":{"type":Config.STRING},"state":{"type":Config.STRING},"zip":{"type":Config.STRING},"country":{"type":Config.STRING},"email":{"type":Config.STRING},"phone":{"type":Config.STRING},"timezone_id":{"type":Config.NUMERIC},"contact_hours":{"type":Config.STRING},"notes":{"type":Config.STRING},"fax":{"type":Config.STRING},"alt_phone":{"type":Config.STRING},"fax_optout":{"type":Config.BOOLEAN},"email_optout":{"type":Config.BOOLEAN},"postal_optout":{"type":Config.BOOLEAN},"customer_id":{"type":Config.NUMERIC},"brand_id":{"type":Config.NUMERIC},"vendor_id":{"type":Config.NUMERIC},"parent_contact_id":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"status":{"type":Config.NUMERIC}},"linkTo":{"timezone":{"table":"timezone","pql":"eq(timezone_id,timezone.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"vendor":{"table":"vendor","pql":"eq(vendor_id,vendor.id)"},"parent_contact":{"table":"contact","pql":"eq(parent_contact_id,parent_contact.id)"}},"linkFrom":{"gateway_accounts":{"table":"gateway_account","pql":"eq(gateway_accounts.billing_contact_id,id)"},"customers_shipping":{"table":"customer","pql":"eq(customers_shipping.primary_shipping_contact_id,id)"},"customers_billing":{"table":"customer","pql":"eq(customers_billing.primary_billing_contact_id,id)"},"customers_primary":{"table":"customer","pql":"eq(customers_primary.primary_contact_id,id)"},"users":{"table":"user","pql":"eq(users.contact_id,id)"},"purchases":{"table":"purchase","pql":"eq(purchases.contact_id,id)"},"brands":{"table":"brand","pql":"eq(brands.contact_id,id)"},"vendors":{"table":"vendor","pql":"eq(vendors.primary_contact_id,id)"},"sales_reps":{"table":"sales_rep","pql":"eq(sales_reps.contact_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Contact\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Contact\")"}}},"control_flag":{"name":"control_flags","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"control_key_id":{"type":Config.NUMERIC},"value":{"type":Config.STRING},"module":{"type":Config.STRING},"item_id":{"type":Config.NUMERIC}},"linkTo":{"control_key":{"table":"control_key","pql":"eq(control_key_id,control_key.id)"}},"linkFrom":[]},"control_key":{"name":"control_keys","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"key":{"type":Config.STRING},"module_flags":{"type":Config.NUMERIC}},"linkTo":[],"linkFrom":{"control_flags":{"table":"control_flag","pql":"eq(control_flags.control_key_id,id)"}}},"customer":{"name":"customers","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"primary_rep_id":{"type":Config.NUMERIC},"current_credit":{"type":Config.NUMERIC},"max_credit_amount":{"type":Config.NUMERIC},"primary_contact_id":{"type":Config.NUMERIC},"primary_billing_contact_id":{"type":Config.NUMERIC},"primary_shipping_contact_id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"notes":{"type":Config.STRING},"website":{"type":Config.STRING},"term_id":{"type":Config.NUMERIC},"resale_tax_number":{"type":Config.STRING},"territory_id":{"type":Config.NUMERIC},"federal_id":{"type":Config.STRING},"dunns":{"type":Config.STRING},"tax_code_id":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"temp_mybooks_id":{"type":Config.STRING},"status":{"type":Config.NUMERIC},"parent_customer_id":{"type":Config.NUMERIC},"unpaid_invoice_amount":{"type":Config.NUMERIC},"primary_shipment_method_id":{"type":Config.NUMERIC},"primary_shipment_account_id":{"type":Config.NUMERIC}},"linkTo":{"rep":{"table":"user","pql":"eq(primary_rep_id,rep.id)"},"primary_contact":{"table":"contact","pql":"eq(primary_contact_id,primary_contact.id)"},"billing_contact":{"table":"contact","pql":"eq(primary_billing_contact_id,billing_contact.id)"},"shipping_contact":{"table":"contact","pql":"eq(primary_shipping_contact_id,shipping_contact.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"territory":{"table":"territory","pql":"eq(territory_id,territory.id)"},"tax_code":{"table":"tax_code","pql":"eq(tax_code_id,tax_code.id)"},"parent_customer":{"table":"customer","pql":"eq(parent_customer_id,parent_customer.id)"},"primary_shipment_method":{"table":"shipment_method","pql":"eq(primary_shipment_method_id,primary_shipment_method.id)"},"primary_shipment_account":{"table":"shipment_account","pql":"eq(primary_shipment_account_id,primary_shipment_account.id)"}},"linkFrom":{"gateway_accounts":{"table":"gateway_account","pql":"eq(gateway_accounts.customer_id,id)"},"payments":{"table":"payment","pql":"eq(payments.customer_id,id)"},"invoices":{"table":"invoice","pql":"eq(invoices.customer_id,id)"},"shipments":{"table":"shipment","pql":"eq(shipments.customer_id,id)"},"orders":{"table":"order","pql":"eq(orders.customer_id,id)"},"child_customers":{"table":"customer","pql":"eq(child_customers.parent_customer_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Customer\")"},"customer_franchises":{"table":"customer_franchises","pql":"eq(customer_franchises.customer_id,id)"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Customer\")"},"shipment_accounts":{"table":"shipment_account","pql":"eq(shipment_accounts.customer_id,id)"},"customer_notifications":{"table":"customers_notifications","pql":"eq(customer_notifications.customer_id,id)"}}},"customer_franchises":{"name":"customer_franchises","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"franchise_id":{"type":Config.NUMERIC},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE},"dont_purge":{"type":Config.BOOLEAN}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Customer_Franchises\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Customer_Franchises\")"}}},"customers_notifications":{"name":"customers_notifications","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"type":{"type":Config.STRING},"contact_method":{"type":Config.STRING},"contact_data":{"type":Config.STRING},"contact_name":{"type":Config.STRING}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Customers_Notifications\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Customers_Notifications\")"}}},"cycle_count":{"name":"cycle_counts","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"date_created":{"type":Config.DATE},"date_completed":{"type":Config.DATE},"active":{"type":Config.BOOLEAN}},"linkTo":[],"linkFrom":[]},"draft_item":{"name":"draft_items","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"order_draft_id":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"status":{"type":Config.NUMERIC},"qty":{"type":Config.NUMERIC},"sell_price":{"type":Config.NUMERIC},"discount":{"type":Config.NUMERIC},"sort_order":{"type":Config.NUMERIC},"starin_promo_id":{"type":Config.NUMERIC},"vendor_promo_id":{"type":Config.NUMERIC},"spiff_id":{"type":Config.NUMERIC},"program_id":{"type":Config.NUMERIC},"order_warehouse_id":{"type":Config.NUMERIC},"order_line_id":{"type":Config.NUMERIC}},"linkTo":{"order_draft":{"table":"order_draft","pql":"eq(order_draft_id,order_draft.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Draft_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Draft_Item\")"}}},"edi_term_code":{"name":"edi_term_codes","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"term_code":{"type":Config.STRING},"description":{"type":Config.STRING}},"linkTo":[],"linkFrom":{"terms":{"table":"term","pql":"eq(terms.edi_term_code_id,id)"}}},"edi_user":{"name":"edi_users","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"contact_id":{"type":Config.NUMERIC},"friendly_name":{"type":Config.STRING},"auth_qualifier":{"type":Config.STRING},"auth_info":{"type":Config.STRING},"security_qualifier":{"type":Config.STRING},"security_info":{"type":Config.STRING},"sender_qualifier":{"type":Config.STRING},"sender_id":{"type":Config.STRING},"receiver_qualifier":{"type":Config.STRING},"receiver_id":{"type":Config.STRING},"control_standard_id":{"type":Config.STRING},"control_version":{"type":Config.STRING},"ack_requested":{"type":Config.STRING},"is_test":{"type":Config.STRING},"sub_element_sep":{"type":Config.STRING},"func_id":{"type":Config.STRING},"application_sender_id":{"type":Config.STRING},"application_receiver_id":{"type":Config.STRING},"responsible_agency_code":{"type":Config.STRING},"version_id":{"type":Config.STRING},"transaction_set_id":{"type":Config.STRING},"element_seperator":{"type":Config.STRING},"tag_seperator":{"type":Config.STRING}},"linkTo":{"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"}},"linkFrom":[]},"employee":{"name":"employees","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"office_id":{"type":Config.NUMERIC},"work_area_location":{"type":Config.STRING},"computer_ip":{"type":Config.STRING},"position":{"type":Config.STRING},"actively_employed":{"type":Config.BOOLEAN},"extension":{"type":Config.STRING},"notes":{"type":Config.STRING}},"linkTo":{"office":{"table":"office","pql":"eq(office_id,office.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Employee\")"},"users":{"table":"user","pql":"eq(users.user_id,id)"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Employee\")"}}},"event":{"name":"events","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"watch_id":{"type":Config.NUMERIC},"transaction_id":{"type":Config.NUMERIC},"message":{"type":Config.STRING},"date":{"type":Config.DATE},"has_read":{"type":Config.BOOLEAN},"module":{"type":Config.STRING}},"linkTo":{"watch":{"table":"watch","pql":"eq(watch_id,watch.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Event\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Event\")"}}},"franchise":{"name":"franchises","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"notes":{"type":Config.STRING},"primary_brand_id":{"type":Config.NUMERIC},"is_exclude":{"type":Config.BOOLEAN},"is_public":{"type":Config.BOOLEAN},"legacy_id":{"type":Config.STRING},"formula":{"type":Config.STRING},"dealer_col":{"type":Config.NUMERIC}},"linkTo":{"brand":{"table":"brand","pql":"eq(primary_brand_id,brand.id)"}},"linkFrom":{"customer_franchises":{"table":"customer_franchises","pql":"eq(customer_franchises.franchise_id,id)"},"franchise_products":{"table":"franchise_products","pql":"eq(franchise_products.franchise_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Franchise\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Franchise\")"}}},"franchise_products":{"name":"franchise_products","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"franchise_id":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"date_voided":{"type":Config.DATE},"date_created":{"type":Config.DATE},"rule_id":{"type":Config.NUMERIC},"sell_price":{"type":Config.NUMERIC},"sugar_column":{"type":Config.STRING}},"linkTo":{"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Franchise_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Franchise_Products\")"}}},"gateway_account":{"name":"gateway_accounts","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"payment_gateway_id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"billing_contact_id":{"type":Config.NUMERIC},"gateway_ref":{"type":Config.STRING},"additional_ref":{"type":Config.STRING},"is_primary":{"type":Config.BOOLEAN},"last_updated":{"type":Config.DATE},"exp_date":{"type":Config.NUMERIC},"type":{"type":Config.STRING}},"linkTo":{"payment_gateway":{"table":"payment_gateway","pql":"eq(payment_gateway_id,payment_gateway.id)"},"billing_contact":{"table":"contact","pql":"eq(billing_contact_id,billing_contact.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"order_draft":{"table":"order_draft","pql":"eq(order_draft.gateway_account_id,id)"},"orders":{"table":"order","pql":"eq(orders.gateway_account_id,id)"},"remits":{"table":"remit","pql":"eq(remits.gateway_account_id,id)"},"payment_gateway_requests":{"table":"payment_gateway_request","pql":"eq(payment_gateway_requests.gateway_account_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Gateway_Account\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Gateway_Account\")"}}},"groupping_products":{"name":"groupping_products","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"parent_id":{"type":Config.NUMERIC},"child_id":{"type":Config.NUMERIC},"num_of_children_in_parent":{"type":Config.NUMERIC},"discount_percent":{"type":Config.NUMERIC}},"linkTo":{"parent":{"table":"product","pql":"eq(parent_id,parent.id)"},"child":{"table":"product","pql":"eq(child_id,child.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Groupping_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Groupping_Products\")"}}},"invoice":{"name":"invoices_view","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"invoice_date":{"type":Config.DATE},"invoice_status":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"legacy_id":{"type":Config.STRING},"invoice_sum":{"type":Config.NUMERIC},"amount_due":{"type":Config.NUMERIC},"amount_received":{"type":Config.NUMERIC},"shipment_id":{"type":Config.NUMERIC},"age":{"type":Config.NUMERIC},"override_date":{"type":Config.DATE},"invoice_id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"retired_date":{"type":Config.DATE}},"linkTo":{"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.invoice_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.invoice_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.invoice_id,id)"},"invoices_payments":{"table":"invoices_payments","pql":"eq(invoices_payments.invoice_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Invoice\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Invoice\")"}}},"invoices_payments":{"name":"invoices_payments","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"payment_id":{"type":Config.NUMERIC},"invoice_id":{"type":Config.NUMERIC},"applied_amount":{"type":Config.NUMERIC},"date_applied":{"type":Config.DATE},"date_voided":{"type":Config.DATE}},"linkTo":{"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Invoices_Payments\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Invoices_Payments\")"}}},"item_exchange":{"name":"item_exchange","fields":{"id":{"type":Config.NUMERIC},"deleted":{"type":Config.BOOLEAN},"product_item_id":{"type":Config.NUMERIC},"from_status":{"type":Config.NUMERIC},"to_status":{"type":Config.NUMERIC},"from_warehouse_id":{"type":Config.NUMERIC},"to_warehouse_id":{"type":Config.NUMERIC},"user_id":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"date":{"type":Config.DATE},"from_product_id":{"type":Config.NUMERIC},"to_product_id":{"type":Config.NUMERIC},"from_cost":{"type":Config.NUMERIC},"to_cost":{"type":Config.NUMERIC}},"linkTo":{"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"},"from_warehouse":{"table":"office","pql":"eq(from_warehouse_id,from_warehouse.id)"},"to_warehouse":{"table":"office","pql":"eq(to_warehouse_id,to_warehouse.id)"},"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Item_Exchange\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Item_Exchange\")"}}},"kit_item":{"name":"kit_items","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"sort_order":{"type":Config.NUMERIC}},"linkTo":{"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"product_item_order_kits":{"table":"product_item","pql":"eq(product_item_order_kits.order_kit_id,id)"},"product_item_purchase_kits":{"table":"product_item","pql":"eq(product_item_purchase_kits.purchase_kit_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Kit_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Kit_Item\")"}}},"last_modified":{"name":"last_modifieds","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"date":{"type":Config.DATE},"module":{"type":Config.STRING},"item_id":{"type":Config.NUMERIC},"user_id":{"type":Config.NUMERIC}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":[]},"memute":{"name":"memutes","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"module":{"type":Config.STRING},"rule_id":{"type":Config.NUMERIC}},"linkTo":{"rule":{"table":"rule","pql":"eq(rule_id,rule.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Memute\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Memute\")"}}},"note":{"name":"notes","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"user_id":{"type":Config.NUMERIC},"note":{"type":Config.STRING},"date":{"type":Config.DATE},"public":{"type":Config.BOOLEAN},"module_flags":{"type":Config.NUMERIC},"module_priority":{"type":Config.NUMERIC},"category":{"type":Config.STRING},"code":{"type":Config.STRING},"legacy_id":{"type":Config.STRING},"important":{"type":Config.BOOLEAN}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.note_id,id)"}}},"notes_link":{"name":"notes_link","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"note_id":{"type":Config.NUMERIC},"module":{"type":Config.STRING},"item_id":{"type":Config.NUMERIC},"date":{"type":Config.DATE},"user_id":{"type":Config.NUMERIC},"void":{"type":Config.BOOLEAN}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"},"note":{"table":"note","pql":"eq(note_id,note.id)"},"bill":{"table":"$module","pql":"eq(item_id,bill.id)"},"booking":{"table":"$module","pql":"eq(item_id,booking.id)"},"brand":{"table":"$module","pql":"eq(item_id,brand.id)"},"contact":{"table":"$module","pql":"eq(item_id,contact.id)"},"customer":{"table":"$module","pql":"eq(item_id,customer.id)"},"employee":{"table":"$module","pql":"eq(item_id,employee.id)"},"event":{"table":"$module","pql":"eq(item_id,event.id)"},"franchise":{"table":"$module","pql":"eq(item_id,franchise.id)"},"groupping_products":{"table":"$module","pql":"eq(item_id,groupping_products.id)"},"invoice":{"table":"$module","pql":"eq(item_id,invoice.id)"},"invoices_payments":{"table":"$module","pql":"eq(item_id,invoices_payments.id)"},"kit_item":{"table":"$module","pql":"eq(item_id,kit_item.id)"},"memute":{"table":"$module","pql":"eq(item_id,memute.id)"},"message":{"table":"$module","pql":"eq(item_id,message.id)"},"office":{"table":"$module","pql":"eq(item_id,office.id)"},"order":{"table":"$module","pql":"eq(item_id,order.id)"},"order_draft":{"table":"$module","pql":"eq(item_id,order_draft.id)"},"payment":{"table":"$module","pql":"eq(item_id,payment.id)"},"product":{"table":"$module","pql":"eq(item_id,product.id)"},"product_bar_code":{"table":"$module","pql":"eq(item_id,product_bar_code.id)"},"product_item":{"table":"$module","pql":"eq(item_id,product_item.id)"},"product_item_report":{"table":"$module","pql":"eq(item_id,product_item_report.id)"},"product_item_return":{"table":"$module","pql":"eq(item_id,product_item_return.id)"},"product_items_bills":{"table":"$module","pql":"eq(item_id,product_items_bills.id)"},"products_vendors":{"table":"$module","pql":"eq(item_id,products_vendors.id)"},"program":{"table":"$module","pql":"eq(item_id,program.id)"},"programs_customers":{"table":"$module","pql":"eq(item_id,programs_customers.id)"},"promo":{"table":"$module","pql":"eq(item_id,promo.id)"},"promos_franchises":{"table":"$module","pql":"eq(item_id,promos_franchises.id)"},"promos_products":{"table":"$module","pql":"eq(item_id,promos_products.id)"},"purchase":{"table":"$module","pql":"eq(item_id,purchase.id)"},"purchase_tracking":{"table":"$module","pql":"eq(item_id,purchase_tracking.id)"},"purchase_tracking_item":{"table":"$module","pql":"eq(item_id,purchase_tracking_item.id)"},"return_product_due":{"table":"$module","pql":"eq(item_id,return_product_due.id)"},"rule":{"table":"$module","pql":"eq(item_id,rule.id)"},"sales_rep":{"table":"$module","pql":"eq(item_id,sales_rep.id)"},"shipment":{"table":"$module","pql":"eq(item_id,shipment.id)"},"shipment_in":{"table":"$module","pql":"eq(item_id,shipment_in.id)"},"shipment_method":{"table":"$module","pql":"eq(item_id,shipment_method.id)"},"spiff":{"table":"$module","pql":"eq(item_id,spiff.id)"},"spiffs_franchises":{"table":"$module","pql":"eq(item_id,spiffs_franchises.id)"},"spiffs_products":{"table":"$module","pql":"eq(item_id,spiffs_products.id)"},"tax_code":{"table":"$module","pql":"eq(item_id,tax_code.id)"},"term":{"table":"$module","pql":"eq(item_id,term.id)"},"territory":{"table":"$module","pql":"eq(item_id,territory.id)"},"timezone":{"table":"$module","pql":"eq(item_id,timezone.id)"}},"linkFrom":[]},"office":{"name":"offices","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"foreman_id":{"type":Config.NUMERIC},"address1":{"type":Config.STRING},"address2":{"type":Config.STRING},"city":{"type":Config.STRING},"state":{"type":Config.STRING},"zip":{"type":Config.STRING},"country":{"type":Config.STRING},"phone":{"type":Config.STRING},"private_name":{"type":Config.STRING},"is_primary":{"type":Config.BOOLEAN},"open_hours":{"type":Config.STRING},"is_warehouse":{"type":Config.BOOLEAN}},"linkTo":{"foreman":{"table":"user","pql":"eq(foreman_id,foreman.id)"},"user":{"table":"user","pql":"eq(foreman_id,user.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.warehouse_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.warehouse_id,id)"},"employees":{"table":"employee","pql":"eq(employees.office_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Office\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Office\")"}}},"order":{"name":"orders","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"ship_name":{"type":Config.STRING},"ship_address1":{"type":Config.STRING},"ship_address2":{"type":Config.STRING},"ship_city":{"type":Config.STRING},"ship_state":{"type":Config.STRING},"ship_zip":{"type":Config.STRING},"ship_country":{"type":Config.STRING},"lead_user_id":{"type":Config.NUMERIC},"order_step":{"type":Config.NUMERIC},"order_created":{"type":Config.DATE},"order_modified":{"type":Config.DATE},"notes":{"type":Config.STRING},"term_id":{"type":Config.NUMERIC},"po_number":{"type":Config.STRING},"requested_delivery_date":{"type":Config.DATE},"requested_delivery_date_end":{"type":Config.DATE},"ship_on_date":{"type":Config.DATE},"tax_code_id":{"type":Config.NUMERIC},"notes_public":{"type":Config.STRING},"address_error":{"type":Config.BOOLEAN},"legacy_id":{"type":Config.STRING},"shipment_method_id":{"type":Config.NUMERIC},"shipment_addr_hash":{"type":Config.STRING},"ship_phone":{"type":Config.STRING},"ship_email":{"type":Config.STRING},"ship_attn":{"type":Config.STRING},"ship_id":{"type":Config.NUMERIC},"quote_id":{"type":Config.NUMERIC},"currency":{"type":Config.STRING},"billing_id":{"type":Config.NUMERIC},"gateway_account_id":{"type":Config.NUMERIC},"shipment_account_id":{"type":Config.NUMERIC},"ship_quote_amount":{"type":Config.NUMERIC},"ship_flags":{"type":Config.NUMERIC}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"lead_user":{"table":"user","pql":"eq(lead_user_id,lead_user.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"tax_code":{"table":"tax_code","pql":"eq(tax_code_id,tax_code.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"bill_override":{"table":"contact","pql":"eq(billing_id,bill_override.id)"},"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"},"shipment_account":{"table":"shipment_account","pql":"eq(shipment_account_id,shipment_account.id)"},"order_draft":{"table":"order_draft","pql":"eq(quote_id,order_draft.id)"}},"linkFrom":{"invoices":{"table":"invoice","pql":"eq(invoices.order_id,id)"},"shipments":{"table":"shipment","pql":"eq(shipments.order_id,id)"},"product_items":{"table":"product_item","pql":"eq(product_items.order_id,id)"},"purchases":{"table":"purchase","pql":"eq(purchases.order_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.order_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.order_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Order\")"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"Order\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Order\")"},"orders_product_items_void":{"table":"orders_product_items_void","pql":"eq(orders_product_items_void.order_id,id)"}}},"order_draft":{"name":"order_drafts","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"ship_attn":{"type":Config.STRING},"ship_name":{"type":Config.STRING},"ship_address1":{"type":Config.STRING},"ship_address2":{"type":Config.STRING},"ship_city":{"type":Config.STRING},"ship_state":{"type":Config.STRING},"ship_zip":{"type":Config.STRING},"ship_country":{"type":Config.STRING},"lead_user_id":{"type":Config.NUMERIC},"order_step":{"type":Config.NUMERIC},"draft_created":{"type":Config.DATE},"term_id":{"type":Config.NUMERIC},"po_number":{"type":Config.STRING},"requested_delivery_date":{"type":Config.DATE},"requested_delivery_date_end":{"type":Config.DATE},"ship_on_date":{"type":Config.DATE},"tax_code_id":{"type":Config.NUMERIC},"shipment_method_id":{"type":Config.NUMERIC},"ship_phone":{"type":Config.STRING},"ship_email":{"type":Config.STRING},"ship_id":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"currency":{"type":Config.STRING},"billing_id":{"type":Config.NUMERIC},"gateway_account_id":{"type":Config.NUMERIC},"ship_flags":{"type":Config.NUMERIC},"shipment_account_id":{"type":Config.NUMERIC},"ship_quote_amount":{"type":Config.NUMERIC},"source":{"type":Config.STRING},"state":{"type":Config.STRING},"reserved_order_id":{"type":Config.NUMERIC},"cart_id":{"type":Config.STRING}},"linkTo":{"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"lead_user":{"table":"user","pql":"eq(lead_user_id,lead_user.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"tax_code":{"table":"tax_code","pql":"eq(tax_code_id,tax_code.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"shipment_account":{"table":"shipment_account","pql":"eq(shipment_account_id,shipment_account.id)"},"reserved_order":{"table":"order","pql":"eq(reserved_order_id,reserved_order.id)"}},"linkFrom":{"orders":{"table":"order","pql":"eq(orders.quote_id,id)"},"draft_items":{"table":"draft_item","pql":"eq(draft_items.order_draft_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Order_Draft\")"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"Order_Draft\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Order_Draft\")"}}},"order_line":{"name":"order_lines","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"customer_part_num":{"type":Config.STRING},"edi_customer_line_id":{"type":Config.STRING},"edi_entered_price":{"type":Config.NUMERIC},"edi_entered_qty":{"type":Config.NUMERIC}},"linkTo":[],"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.order_line_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.order_line_id,id)"},"product_item_returns":{"table":"product_item_return","pql":"eq(product_item_returns.order_line_id,id)"}}},"order_return":{"name":"order_returns","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"date_entered":{"type":Config.DATE},"rma_number":{"type":Config.STRING},"notes":{"type":Config.STRING},"date_returned":{"type":Config.DATE},"payment_id":{"type":Config.NUMERIC},"order_id":{"type":Config.NUMERIC},"status":{"type":Config.NUMERIC},"contact_id":{"type":Config.NUMERIC},"type":{"type":Config.STRING},"code":{"type":Config.STRING},"replacement_order_id":{"type":Config.NUMERIC},"vendor_rma_number":{"type":Config.STRING},"office_id":{"type":Config.NUMERIC},"public_note":{"type":Config.STRING}},"linkTo":{"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"},"replacement_order":{"table":"order","pql":"eq(replacement_order_id,replacement_order.id)"},"office":{"table":"office","pql":"eq(office_id,office.id)"}},"linkFrom":{"shipments_ins":{"table":"shipment_in","pql":"eq(shipments_ins.order_return_id,id)"},"return_product_dues":{"table":"return_product_due","pql":"eq(return_product_dues.order_return_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.return_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Order_Return\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Order_Return\")"}}},"orders_product_items_void":{"name":"orders_product_items_void","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"order_id":{"type":Config.NUMERIC},"product_item_id":{"type":Config.NUMERIC},"void_sell_price":{"type":Config.NUMERIC},"order_kit_id":{"type":Config.NUMERIC},"date_canceled":{"type":Config.DATE},"moved_from_order_id":{"type":Config.NUMERIC}},"linkTo":{"order":{"table":"order","pql":"eq(order_id,order.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"},"orig_order":{"table":"order","pql":"eq(moved_from_order_id,orig_order.id)"}},"linkFrom":[]},"package":{"name":"packages","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"track_code":{"type":Config.STRING},"weight":{"type":Config.NUMERIC},"height":{"type":Config.NUMERIC},"width":{"type":Config.NUMERIC},"length":{"type":Config.NUMERIC},"shipment_id":{"type":Config.NUMERIC},"last_modified":{"type":Config.DATE}},"linkTo":{"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.package_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.package_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.package_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Package\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Package\")"}}},"payment":{"name":"payments","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"reference_number":{"type":Config.STRING},"date_claimed":{"type":Config.DATE},"date_effective":{"type":Config.DATE},"amount_applied":{"type":Config.NUMERIC},"amount_received":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"legacy_id":{"type":Config.STRING},"customer_id":{"type":Config.NUMERIC},"status":{"type":Config.NUMERIC},"date_created":{"type":Config.DATE},"payment_type":{"type":Config.STRING},"fee":{"type":Config.NUMERIC},"freight_refunded":{"type":Config.NUMERIC},"misc_refunded":{"type":Config.NUMERIC},"tax_refunded":{"type":Config.NUMERIC},"refunded_date":{"type":Config.DATE},"refunded_amount":{"type":Config.STRING},"refunded_method":{"type":Config.STRING},"refunded_notes":{"type":Config.STRING},"currency":{"type":Config.STRING}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"payment_gateway_requests":{"table":"payment_gateway_request","pql":"eq(payment_gateway_requests.payment_id,id)"},"remits_payments":{"table":"remits_payments","pql":"eq(remits_payments.payment_id,id)"},"order_returns":{"table":"order_return","pql":"eq(order_returns.payment_id,id)"},"invoices_payments":{"table":"invoices_payments","pql":"eq(invoices_payments.payment_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Payment\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Payment\")"}}},"payment_gateway":{"name":"payment_gateways","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"class_name":{"type":Config.STRING}},"linkTo":[],"linkFrom":{"gateway_accounts":{"table":"gateway_account","pql":"eq(gateway_accounts.payment_gateway_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Payment_Gateway\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Payment_Gateway\")"}}},"payment_gateway_request":{"name":"payment_gateway_requests","fields":{"id":{"type":Config.NUMERIC},"request_type":{"type":Config.STRING},"gateway_account_id":{"type":Config.NUMERIC},"reference":{"type":Config.STRING},"confirmation_num":{"type":Config.STRING},"payment_id":{"type":Config.NUMERIC},"amount":{"type":Config.NUMERIC},"request_date":{"type":Config.DATE},"request_by":{"type":Config.NUMERIC},"approved":{"type":Config.BOOLEAN},"deny_reason":{"type":Config.STRING},"full_request":{"type":Config.STRING},"full_response":{"type":Config.STRING},"deleted":{"type":Config.BOOLEAN}},"linkTo":{"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"},"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"request_user":{"table":"user","pql":"eq(request_by,request_user.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Office\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Office\")"}}},"product":{"name":"products","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"date_created":{"type":Config.DATE},"description":{"type":Config.STRING},"item_code":{"type":Config.STRING},"brand_id":{"type":Config.NUMERIC},"category_id":{"type":Config.NUMERIC},"sort_order":{"type":Config.NUMERIC},"weight":{"type":Config.NUMERIC},"dimension_h":{"type":Config.NUMERIC},"dimension_w":{"type":Config.NUMERIC},"dimension_l":{"type":Config.NUMERIC},"list_price":{"type":Config.NUMERIC},"map_price":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"vendor_part_number":{"type":Config.STRING},"primary_vendor_id":{"type":Config.NUMERIC},"status":{"type":Config.NUMERIC},"taxable":{"type":Config.BOOLEAN},"freight_only":{"type":Config.BOOLEAN},"upc_code":{"type":Config.STRING},"replacement_id":{"type":Config.NUMERIC},"bin_location":{"type":Config.STRING},"has_internal_serial":{"type":Config.BOOLEAN},"has_external_serial":{"type":Config.BOOLEAN},"ht_code":{"type":Config.STRING},"date_discontinued":{"type":Config.DATE},"master_pack_qty":{"type":Config.NUMERIC},"automation_flags":{"type":Config.NUMERIC},"primary_warehouse_id":{"type":Config.NUMERIC},"date_changed":{"type":Config.DATE},"default_stock_type":{"type":Config.NUMERIC}},"linkTo":{"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"primary_vendor":{"table":"vendor","pql":"eq(primary_vendor_id,primary_vendor.id)"},"replacement":{"table":"product","pql":"eq(replacement_id,replacement.id)"},"primary_warehouse":{"table":"office","pql":"eq(primary_warehouse_id,primary_warehouse.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.product_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.product_id,id)"},"children":{"table":"groupping_products","pql":"eq(children.child_id,id)"},"parent":{"table":"groupping_products","pql":"eq(parent.parent_id,id)"},"products_vendors":{"table":"products_vendors","pql":"eq(products_vendors.product_id,id)"},"product_bar_codes":{"table":"product_bar_code","pql":"eq(product_bar_codes.product_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product\")"},"franchise_products":{"table":"franchise_products","pql":"eq(franchise_products.product_id,id)"}}},"product_bar_code":{"name":"product_bar_codes","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"bar_code":{"type":Config.STRING},"product_id":{"type":Config.NUMERIC},"type":{"type":Config.STRING}},"linkTo":{"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Bar_Code\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Bar_Code\")"}}},"product_item":{"name":"product_items","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"serial_number":{"type":Config.STRING},"warehouse_id":{"type":Config.NUMERIC},"warehouse_location":{"type":Config.STRING},"date_received":{"type":Config.DATE},"date_shipped":{"type":Config.DATE},"status":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"item_cost":{"type":Config.NUMERIC},"roi_cost":{"type":Config.NUMERIC},"purchase_id":{"type":Config.NUMERIC},"order_id":{"type":Config.NUMERIC},"sell_price":{"type":Config.NUMERIC},"invoice_id":{"type":Config.NUMERIC},"shipment_id":{"type":Config.NUMERIC},"sales_rep_id":{"type":Config.NUMERIC},"sort_order":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"tax_amount":{"type":Config.NUMERIC},"temp_cust_id":{"type":Config.STRING},"shipment_in_id":{"type":Config.NUMERIC},"vendor_serial":{"type":Config.STRING},"override_date":{"type":Config.DATE},"order_kit_id":{"type":Config.NUMERIC},"purchase_kit_id":{"type":Config.NUMERIC},"discount":{"type":Config.NUMERIC},"starin_promo_id":{"type":Config.NUMERIC},"vendor_promo_id":{"type":Config.NUMERIC},"spiff_id":{"type":Config.NUMERIC},"program_id":{"type":Config.NUMERIC},"package_id":{"type":Config.NUMERIC},"has_changed":{"type":Config.BOOLEAN},"order_warehouse_id":{"type":Config.NUMERIC},"stock_type":{"type":Config.STRING},"order_line_id":{"type":Config.NUMERIC},"purchase_tracking_item_id":{"type":Config.NUMERIC}},"linkTo":{"warehouse":{"table":"office","pql":"eq(warehouse_id,warehouse.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"},"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"},"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"},"sales_rep":{"table":"sales_rep","pql":"eq(sales_rep_id,sales_rep.id)"},"shipment_in":{"table":"shipment_in","pql":"eq(shipment_in_id,shipment_in.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"purchase_kit":{"table":"kit_item","pql":"eq(purchase_kit_id,purchase_kit.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"package":{"table":"package","pql":"eq(package_id,package.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"},"purchase_tracking_item":{"table":"purchase_tracking_item","pql":"eq(purchase_tracking_item_id,purchase_tracking_item.id)"}},"linkFrom":{"product_items_bills":{"table":"product_items_bills","pql":"eq(product_items_bills.product_item_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.product_item_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Item\")"}}},"product_item_report":{"name":"product_items_reports","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"serial_number":{"type":Config.STRING},"warehouse_id":{"type":Config.NUMERIC},"warehouse_location":{"type":Config.STRING},"date_received":{"type":Config.DATE},"date_shipped":{"type":Config.DATE},"status":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"item_cost":{"type":Config.NUMERIC},"roi_cost":{"type":Config.NUMERIC},"purchase_id":{"type":Config.NUMERIC},"order_id":{"type":Config.NUMERIC},"sell_price":{"type":Config.NUMERIC},"invoice_id":{"type":Config.NUMERIC},"shipment_id":{"type":Config.NUMERIC},"sales_rep_id":{"type":Config.NUMERIC},"sort_order":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"tax_amount":{"type":Config.NUMERIC},"temp_cust_id":{"type":Config.STRING},"shipment_in_id":{"type":Config.NUMERIC},"vendor_serial":{"type":Config.STRING},"return_id":{"type":Config.NUMERIC},"override_date":{"type":Config.DATE},"order_kit_id":{"type":Config.NUMERIC},"purchase_kit_id":{"type":Config.NUMERIC},"discount":{"type":Config.NUMERIC},"starin_promo_id":{"type":Config.NUMERIC},"vendor_promo_id":{"type":Config.NUMERIC},"spiff_id":{"type":Config.NUMERIC},"program_id":{"type":Config.NUMERIC},"package_id":{"type":Config.NUMERIC},"has_changed":{"type":Config.BOOLEAN},"order_warehouse_id":{"type":Config.NUMERIC},"order_line_id":{"type":Config.NUMERIC},"source":{"type":Config.STRING},"stock_type":{"type":Config.STRING},"purchase_tracking_item_id":{"type":Config.NUMERIC}},"linkTo":{"warehouse":{"table":"office","pql":"eq(warehouse_id,warehouse.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"},"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"},"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"},"sales_rep":{"table":"sales_rep","pql":"eq(sales_rep_id,sales_rep.id)"},"shipment_in":{"table":"shipment_in","pql":"eq(shipment_in_id,shipment_in.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"purchase_kit":{"table":"kit_item","pql":"eq(purchase_kit_id,purchase_kit.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"package":{"table":"package","pql":"eq(package_id,package.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"},"purchase_tracking_item":{"table":"purchase_tracking_item","pql":"eq(purchase_tracking_item_id,purchase_tracking_item.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,product_item_id) eq(notes_links.module,\"Product_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,product_item_id) eq(last_modified.module,\"Product_Item\")"}}},"product_item_return":{"name":"product_items_returns","fields":{"id":{"type":Config.NUMERIC},"deleted":{"type":Config.BOOLEAN},"product_item_id":{"type":Config.NUMERIC},"return_id":{"type":Config.NUMERIC},"return_sell_price":{"type":Config.NUMERIC},"restock_fee":{"type":Config.NUMERIC},"invoice_id":{"type":Config.NUMERIC},"shipment_id":{"type":Config.NUMERIC},"order_id":{"type":Config.NUMERIC},"status":{"type":Config.NUMERIC},"date_shipped":{"type":Config.DATE},"date_return_received":{"type":Config.DATE},"sort_order":{"type":Config.NUMERIC},"sales_rep_id":{"type":Config.NUMERIC},"sell_price":{"type":Config.NUMERIC},"tax_amount":{"type":Config.NUMERIC},"shipment_in_id":{"type":Config.NUMERIC},"override_date":{"type":Config.DATE},"discount":{"type":Config.NUMERIC},"starin_promo_id":{"type":Config.NUMERIC},"vendor_promo_id":{"type":Config.NUMERIC},"spiff_id":{"type":Config.NUMERIC},"program_id":{"type":Config.NUMERIC},"package_id":{"type":Config.NUMERIC},"order_kit_id":{"type":Config.NUMERIC},"order_warehouse_id":{"type":Config.NUMERIC},"order_line_id":{"type":Config.NUMERIC},"stock_type":{"type":Config.STRING}},"linkTo":{"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"},"order_return":{"table":"order_return","pql":"eq(return_id,order_return.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"},"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"sales_rep":{"table":"user","pql":"eq(sales_rep_id,sales_rep.id)"},"shipment_in":{"table":"shipment_in","pql":"eq(shipment_in_id,shipment_in.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"package":{"table":"package","pql":"eq(package_id,package.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Item_Return\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Item_Return\")"}}},"product_items_bills":{"name":"product_items_bills","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"product_item_id":{"type":Config.NUMERIC},"bill_id":{"type":Config.NUMERIC},"item_cost":{"type":Config.NUMERIC}},"linkTo":{"bill":{"table":"bill","pql":"eq(bill_id,bill.id)"},"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Item_Bills\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Item_Bills\")"}}},"products_vendors":{"name":"products_vendors","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"vendor_id":{"type":Config.NUMERIC},"cost":{"type":Config.NUMERIC}},"linkTo":{"product":{"table":"product","pql":"eq(product_id,product.id)"},"vendor":{"table":"vendor","pql":"eq(vendor_id,vendor.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Vendors\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Vendors\")"}}},"program":{"name":"programs","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"start_date":{"type":Config.DATE},"end_date":{"type":Config.DATE},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE},"brand_id":{"type":Config.NUMERIC},"rule_id":{"type":Config.NUMERIC}},"linkTo":{"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"rule":{"table":"rule","pql":"eq(rule_id,rule.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.program_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.program_id,id)"},"product_item_returns":{"table":"product_item_returns","pql":"eq(product_item_returns.program_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Program\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Program\")"}}},"programs_customers":{"name":"programs_customers","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"program_id":{"type":Config.STRING},"customer_id":{"type":Config.DATE},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE},"parameters":{"type":Config.STRING}},"linkTo":{"program":{"table":"program","pql":"eq(program_id,program.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Programs_Customers\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Programs_Customers\")"}}},"promo":{"name":"promos","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"start_date":{"type":Config.DATE},"end_date":{"type":Config.DATE},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE},"type":{"type":Config.STRING},"rule_id":{"type":Config.NUMERIC},"brand_id":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"promo_code":{"type":Config.STRING},"before_order_rule_id":{"type":Config.NUMERIC},"after_invoice_rule_id":{"type":Config.NUMERIC}},"linkTo":{"rule":{"table":"rule","pql":"eq(rule_id,rule.id)"},"brand_id":{"table":"brand","pql":"eq(brand_id,brand_id.id)"}},"linkFrom":{"product_item_starin_promos":{"table":"product_item","pql":"eq(product_item_starin_promos.starin_promo_id,id)"},"product_item_vendor_promos":{"table":"product_item","pql":"eq(product_item_vendor_promos.vendor_promo_id,id)"},"product_item_return_starin_promos":{"table":"product_item_return","pql":"eq(product_item_return_starin_promos.starin_promo_id,id)"},"product_item_return_vendor_promos":{"table":"product_item_return","pql":"eq(product_item_return_vendor_promos.vendor_promo_id,id)"},"product_item_report_starin_promos":{"table":"product_item_report","pql":"eq(product_item_report_starin_promos.starin_promo_id,id)"},"product_item_report_vendor_promos":{"table":"product_item_report","pql":"eq(product_item_report_vendor_promos.vendor_promo_id,id)"},"promos_franchises":{"table":"promos_franchises","pql":"eq(promos_franchises.promo_id,id)"},"promos_products":{"table":"promos_products","pql":"eq(promos_products.promo_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Promo\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Promo\")"}}},"promos_franchises":{"name":"promos_franchises","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"promo_id":{"type":Config.NUMERIC},"franchise_id":{"type":Config.NUMERIC},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE}},"linkTo":{"promo":{"table":"promo","pql":"eq(promo_id,promo.id)"},"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Promos_Franchises\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Promos_Franchises\")"}}},"promos_products":{"name":"promos_products","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"promo_id":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE},"description":{"type":Config.STRING}},"linkTo":{"promo":{"table":"promo","pql":"eq(promo_id,promo.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Promos_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Promos_Products\")"}}},"purchase":{"name":"purchases","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"vendor_id":{"type":Config.NUMERIC},"date_ordered":{"type":Config.DATE},"notes":{"type":Config.STRING},"status":{"type":Config.NUMERIC},"term_id":{"type":Config.NUMERIC},"shipment_method_id":{"type":Config.NUMERIC},"assigned_user_id":{"type":Config.NUMERIC},"sub_total":{"type":Config.NUMERIC},"tax":{"type":Config.NUMERIC},"freight":{"type":Config.NUMERIC},"misc":{"type":Config.NUMERIC},"total":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"office_id":{"type":Config.NUMERIC},"order_id":{"type":Config.NUMERIC},"notes_public":{"type":Config.STRING},"ship_account_num":{"type":Config.STRING},"est_received_date":{"type":Config.DATE},"vendor_order_number":{"type":Config.STRING}},"linkTo":{"vendor":{"table":"vendor","pql":"eq(vendor_id,vendor.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"assigned_user":{"table":"user","pql":"eq(assigned_user_id,assigned_user.id)"},"office":{"table":"office","pql":"eq(office_id,office.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.purchase_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.purchase_id,id)"},"bills":{"table":"bill","pql":"eq(bills.purchase_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Purchase\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Purchase\")"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"Purchase\")"}}},"purchase_tracking":{"name":"purchase_tracking","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"purchase_id":{"type":Config.NUMERIC},"estimated_receive_date":{"type":Config.DATE},"tracking_number":{"type":Config.STRING},"shipment_method_id":{"type":Config.NUMERIC},"last_updated":{"type":Config.DATE},"variance":{"type":Config.NUMERIC},"note":{"type":Config.STRING},"ref_number":{"type":Config.STRING}},"linkTo":{"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"}},"linkFrom":{"purchase_tracking_items":{"table":"purchase_tracking_item","pql":"eq(purchase_tracking_items.purchase_tracking_id,id)"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"PURCHASE_TRACKING\")"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Purchase_Tracking\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Purchase_Tracking\")"}}},"purchase_tracking_item":{"name":"purchase_tracking_items","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"purchase_tracking_id":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"stock_type":{"type":Config.STRING},"qty":{"type":Config.NUMERIC},"qty_received":{"type":Config.NUMERIC}},"linkTo":{"purchase_tracking":{"table":"purchase_tracking","pql":"eq(purchase_tracking_id,purchase_tracking.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.purchase_tracking_item_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.purchase_tracking_item_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Purchase_Tracking_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Purchase_Tracking_Item\")"}}},"remit":{"name":"remits","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"paid":{"type":Config.BOOLEAN},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE},"amount_due":{"type":Config.NUMERIC},"gateway_account_id":{"type":Config.NUMERIC}},"linkTo":{"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"}},"linkFrom":{"shipments":{"table":"shipment","pql":"eq(shipments.remit_id,id)"},"remits_payments":{"table":"remits_payments","pql":"eq(remits_payments.remit_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Remit\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Remit\")"}}},"remits_payments":{"name":"remits_payments","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"remit_id":{"type":Config.NUMERIC},"payment_id":{"type":Config.NUMERIC},"amount":{"type":Config.NUMERIC},"date_applied":{"type":Config.DATE},"date_voided":{"type":Config.DATE}},"linkTo":{"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"remit":{"table":"remit","pql":"eq(remit_id,remit.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Remits_Payments\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Remits_Payments\")"}}},"return_product_due":{"name":"return_product_due","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"product_item_id":{"type":Config.NUMERIC},"order_return_id":{"type":Config.NUMERIC}},"linkTo":{"order_return":{"table":"order_return","pql":"eq(order_return_id,order_return.id)"},"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"}},"linkFrom":[]},"rule":{"name":"rules","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"code":{"type":Config.STRING},"file":{"type":Config.STRING}},"linkTo":[],"linkFrom":[]},"sales_rep":{"name":"sales_reps","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"contact_id":{"type":Config.NUMERIC},"user_id":{"type":Config.NUMERIC},"assigned_user_id":{"type":Config.NUMERIC},"is_distributor":{"type":Config.BOOLEAN},"notes":{"type":Config.STRING},"legacy_id":{"type":Config.STRING}},"linkTo":{"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"},"user":{"table":"user","pql":"eq(user_id,user.id)"},"assigned_user":{"table":"user","pql":"eq(assigned_user_id,assigned_user.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.sales_rep_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Sales_Rep\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Sales_Rep\")"}}},"shipment":{"name":"shipments","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"shipment_method_id":{"type":Config.NUMERIC},"track_code":{"type":Config.STRING},"notes":{"type":Config.STRING},"actual_cost":{"type":Config.NUMERIC},"ship_date":{"type":Config.DATE},"date_due":{"type":Config.DATE},"shipment_fee":{"type":Config.NUMERIC},"handling_fee":{"type":Config.NUMERIC},"flags":{"type":Config.NUMERIC},"shipment_addr_hash":{"type":Config.STRING},"customer_id":{"type":Config.NUMERIC},"bill_id":{"type":Config.NUMERIC},"term_id":{"type":Config.NUMERIC},"backorder_hash":{"type":Config.STRING},"remit_id":{"type":Config.NUMERIC},"discount_amount":{"type":Config.NUMERIC},"shipment_account_id":{"type":Config.NUMERIC},"shipment_flags":{"type":Config.NUMERIC}},"linkTo":{"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"bill":{"table":"bill","pql":"eq(bill_id,bill.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"remit":{"table":"remit","pql":"eq(remit_id,remit.id)"},"shipment_account":{"table":"shipment_account","pql":"eq(shipment_account_id,shipment_account.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.shipment_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.shipment_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.shipment_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment\")"},"invoices":{"table":"invoice","pql":"eq(invoices.shipment_id,id)"}}},"shipment_account":{"name":"shipment_accounts","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"customer_id":{"type":Config.NUMERIC},"shipment_method_id":{"type":Config.NUMERIC},"ship_account_num":{"type":Config.STRING},"third_party_contact_id":{"type":Config.NUMERIC}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"third_party_contact":{"table":"contact","pql":"eq(third_party_contact_id,third_party_contact.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment_Account\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment_Account\")"}}},"shipment_in":{"name":"shipments_in","fields":{"id":{"type":Config.NUMERIC},"deleted":{"type":Config.BOOLEAN},"date_entered":{"type":Config.DATE},"purchase_id":{"type":Config.NUMERIC},"order_return_id":{"type":Config.NUMERIC},"notes":{"type":Config.STRING},"track_code":{"type":Config.STRING},"office_id":{"type":Config.NUMERIC},"shipment_method_id":{"type":Config.NUMERIC}},"linkTo":{"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"order_return":{"table":"order_return","pql":"eq(order_return_id,order_return.id)"},"office":{"table":"office","pql":"eq(office_id,office.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.shipment_in_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment_In\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment_In\")"}}},"shipment_method":{"name":"shipment_methods","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"customer_id":{"type":Config.NUMERIC},"prepaid":{"type":Config.BOOLEAN},"carrier_code":{"type":Config.STRING},"carrier":{"type":Config.STRING},"parent_shipment_method_id":{"type":Config.NUMERIC},"carrier_id":{"type":Config.NUMERIC},"transportaion_method_code":{"type":Config.STRING},"is_freight":{"type":Config.BOOLEAN},"time_in_transit":{"type":Config.NUMERIC},"service_level_code":{"type":Config.STRING}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"parent_shipment_method":{"table":"shipment_method","pql":"eq(parent_shipment_method_id,parent_shipment_method.id)"},"scac":{"table":"carrier","pql":"eq(carrier_id,scac.id)"}},"linkFrom":{"purchases":{"table":"purchase","pql":"eq(purchases.shipment_method_id,id)"},"shipments":{"table":"shipment","pql":"eq(shipments.shipment_method_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment_Method\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment_Method\")"},"child_shipment_methods":{"table":"shipment_method","pql":"eq(child_shipment_methods.parent_shipment_method_id,id)"},"shipment_accounts":{"table":"shipment_account","pql":"eq(shipment_accounts.shipment_method_id,id)"}}},"spiff":{"name":"spiffs","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"start_date":{"type":Config.DATE},"end_date":{"type":Config.DATE},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE},"notes":{"type":Config.STRING},"max":{"type":Config.NUMERIC}},"linkTo":[],"linkFrom":{"spiffs_franchises":{"table":"spiffs_franchises","pql":"eq(spiffs_franchises.spiff_id,id)"},"spiffs_products":{"table":"spiffs_products","pql":"eq(spiffs_products.spiff_id,id)"},"product_items":{"table":"product_item","pql":"eq(product_items.spiff_id,id)"},"product_item_returns":{"table":"product_item_return","pql":"eq(product_item_returns.spiff_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.spiff_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Spiff\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Spiff\")"}}},"spiffs_franchises":{"name":"spiffs_franchises","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"spiff_id":{"type":Config.NUMERIC},"franchise_id":{"type":Config.NUMERIC},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE}},"linkTo":{"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Spiff_Franchises\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Spiff_Franchises\")"}}},"spiffs_products":{"name":"spiffs_products","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"spiff_id":{"type":Config.NUMERIC},"product_id":{"type":Config.NUMERIC},"qty":{"type":Config.NUMERIC},"date_created":{"type":Config.DATE},"date_voided":{"type":Config.DATE}},"linkTo":{"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Spiffs_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Spiffs_Products\")"}}},"tax_code":{"name":"tax_codes","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"percentage":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"shipment_tax":{"type":Config.NUMERIC}},"linkTo":[],"linkFrom":{"orders":{"table":"order","pql":"eq(orders.tax_code_id,id)"},"customers":{"table":"customer","pql":"eq(customers.tax_code_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Tax_Code\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Tax_Code\")"}}},"term":{"name":"terms","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"due_days":{"type":Config.NUMERIC},"discount":{"type":Config.NUMERIC},"discount_days":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"order_override_flags":{"type":Config.NUMERIC},"classification":{"type":Config.STRING},"grace_days":{"type":Config.NUMERIC},"edi_term_code_id":{"type":Config.NUMERIC}},"linkTo":{"edi_term_code":{"table":"edi_term_code","pql":"eq(edi_term_code_id,edi_term_code.id)"}},"linkFrom":{"purchases":{"table":"purchase","pql":"eq(purchases.term_id,id)"},"bills":{"table":"bill","pql":"eq(bills.term_id,id)"},"customers":{"table":"customer","pql":"eq(customers.term_id,id)"},"vendors":{"table":"vendor","pql":"eq(vendors.term_id,id)"},"orders":{"table":"order","pql":"eq(orders.term_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Term\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Term\")"}}},"territory":{"name":"territories","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"notes":{"type":Config.STRING},"legacy_id":{"type":Config.STRING},"country":{"type":Config.STRING},"region":{"type":Config.STRING},"state_province":{"type":Config.STRING}},"linkTo":[],"linkFrom":{"customers":{"table":"customer","pql":"eq(customers.territory_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Territory\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Territory\")"}}},"timezone":{"name":"timezones","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"utc":{"type":Config.STRING},"dst":{"type":Config.STRING}},"linkTo":[],"linkFrom":{"contacts":{"table":"contact","pql":"eq(contacts.timezone_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Timezone\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Timezone\")"}}},"user":{"name":"users_view","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"username":{"type":Config.STRING},"password":{"type":Config.STRING},"can_login":{"type":Config.BOOLEAN},"employee_id":{"type":Config.NUMERIC},"contact_id":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"wh_scan":{"type":Config.STRING}},"linkTo":{"employee":{"table":"employee","pql":"eq(employee_id,employee.id)"},"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"}},"linkFrom":{"user_historys":{"table":"user_history","pql":"eq(user_historys.user_id,id)"},"voided_gateway_requests":{"table":"payment_gateway_request","pql":"eq(voided_gateway_requests.void_by,id)"},"approved_gateway_requests":{"table":"payment_gateway_request","pql":"eq(approved_gateway_requests.approved_by,id)"},"requested_gateway_requests":{"table":"payment_gateway_request","pql":"eq(requested_gateway_requests.request_by,id)"},"offices":{"table":"office","pql":"eq(offices.foreman_id,id)"},"customers":{"table":"customer","pql":"eq(customers.primary_rep_id,id)"},"purchases":{"table":"purchase","pql":"eq(purchases.assigned_user_id,id)"},"orders":{"table":"order","pql":"eq(orders.assigned_user_id,id)"},"sales_reps":{"table":"sales_rep","pql":"eq(sales_reps.user_id,id)"},"assigned_sales_reps":{"table":"sales_rep","pql":"eq(assigned_sales_reps.assigned_user_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"User\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"User\")"}}},"user_history":{"name":"user_historys","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"user_id":{"type":Config.NUMERIC},"method":{"type":Config.STRING},"args":{"type":Config.STRING},"window_id":{"type":Config.NUMERIC},"date":{"type":Config.DATE}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":[]},"vendor":{"name":"vendors","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"name":{"type":Config.STRING},"notes":{"type":Config.STRING},"primary_contact_id":{"type":Config.NUMERIC},"term_id":{"type":Config.NUMERIC},"legacy_id":{"type":Config.STRING},"temp_mybooks_id":{"type":Config.STRING},"our_account_number":{"type":Config.STRING},"default_shipment_method_id":{"type":Config.NUMERIC},"default_office_id":{"type":Config.NUMERIC}},"linkTo":{"term":{"table":"term","pql":"eq(term_id,term.id)"},"primary_contact":{"table":"contact","pql":"eq(primary_contact_id,primary_contact.id)"},"default_shipment_method":{"table":"shipment_method","pql":"eq(default_shipment_method_id,default_shipment_method.id)"},"default_office":{"table":"office","pql":"eq(default_office_id,default_office.id)"}},"linkFrom":{"purchases":{"table":"purchase","pql":"eq(purchases.vendor_id,id)"},"contacts":{"table":"contact","pql":"eq(contacts.vendor_id,id)"},"primary_products":{"table":"product","pql":"eq(primary_products.vendor_id,id)"},"bills":{"table":"bill","pql":"eq(bills.vendor_id,id)"},"products_vendors":{"table":"products_vendors","pql":"eq(products_vendors.vendor_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Vendor\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Vendor\")"}}},"watch":{"name":"watchs","fields":{"deleted":{"type":Config.BOOLEAN},"id":{"type":Config.NUMERIC},"user_id":{"type":Config.NUMERIC},"record_id":{"type":Config.NUMERIC},"created":{"type":Config.DATE},"note":{"type":Config.STRING},"memute_id":{"type":Config.NUMERIC}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"},"memute":{"table":"memute","pql":"eq(memute_id,memute.id)"}},"linkFrom":[]}};


import { EQUAL }        from  './opcodes/comparitors/equal.js';
import { GREATER_THAN } from  './opcodes/comparitors/greater_than.js';
import { LESS_THAN }    from  './opcodes/comparitors/less_than.js';
import { LIKE }         from  './opcodes/comparitors/like.js';
import { NO_VALUE }     from  './opcodes/comparitors/no_value.js';
import { NOT_EQUAL }    from  './opcodes/comparitors/not_equal.js';
import { NOT_LIKE }     from  './opcodes/comparitors/not_like.js';

import { CONSTANTS_ARRAY } from './opcodes/constants_array.js';
import { NULL } from './opcodes/null.js';

Config.FUNCTION_MAP  = {
    eq: {
        description: 'Compares two values',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new EQUAL(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    gt: {
        description: 'Checks if first value is greater than second',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new GREATER_THAN(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    lt: {
        description: 'Checks if first value is less than second',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new LESS_THAN(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    ne: {
        description: 'Checks if values are not equal',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new NOT_EQUAL(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    like: {
        description: 'Checks if first value is like second. % sign is wild card character',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new LIKE(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    not_like: {
        description: 'Checks if first value is not like second. % sign is wild card character',
        min_args: 2,
        max_args: 2,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var obj = new NOT_LIKE(pql);
            obj.setLeft(orig_args[0]);
            obj.setRight(orig_args[1]);
            return obj.getSQL(query_obj);
        },
    },
    'in': {
        description: 'Checks if first value is any of the following values',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var out_args = [];
            var obj = new EQUAL(pql);
            orig_args.splice(1).forEach((v) => {
                out_args.push(v);
            });
            obj.setLeft(orig_args[0]);
            obj.setRight(new CONSTANTS_ARRAY(pql, out_args));
            return obj.getSQL(query_obj);
        },
    },
    not_in: {
        description: 'Checks if first value is not any of the following values',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.BOOLEAN,
        format: function (args, orig_args, query_obj){
            var pql = this.getPqlObj();
            var out_args = [];
            var obj = new NOT_EQUAL(pql);
            orig_args.splice(1).forEach((v) => {
                out_args.push(v);
            });
            obj.setLeft(orig_args[0]);
            obj.setRight(new CONSTANTS_ARRAY(pql, out_args));
            return obj.getSQL(query_obj);
        },
    },
    'if': {
        description: 'If first argument is truethy returns second argument otherwise returns third',
        min_args: 3,
        max_args: 3,
        return_type: Config.ANY,
        format: ['IF(', Config.ALL_ARGS, ')'],
    },
    /* Math functions */
    add: {
        description: 'Adds values together',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' + ');
        },
    },
    sub: {
        description: 'Subtracts values from eachother',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' - ');
        },
    },
    mul: {
        description: 'Multiplies values together',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' * ');
        },
    },
    div: {
        description: 'Divide values together',
        min_args: 2,
        max_args: Infinity,
        return_type: Config.NUMBER,
        format: function (args, orig_args, query_obj){
            return args.join(' / ');
        },
    },
    mod: {
        description: 'Modulus values together',
        min_args: 2,
        max_args: 2,
        return_type: Config.NUMBER,
        format: ['MOD(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    pow: {
        description: 'Powers values together',
        min_args: 2,
        max_args: 2,
        return_type: Config.NUMBER,
        format: ['POW(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    sqrt: {
        description: 'Square roots a value',
        min_args: 1,
        max_args: 1,
        return_type: Config.NUMBER,
        format: ['SQRT(', Config.ARG1, ')'],
    },

    /* Standard SQL functions */
    abs: {
        description: 'Gets absolute value',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.NUMERIC,
        ],
        return_type: Config.NUMERIC,
        format: ['ABS(', Config.ARG1, ')'],
    },
    'char': {
        description: 'Gets character from numerical ascii character',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            Config.NUMERIC,
        ],
        return_type: Config.STRING,
        format: ['CHAR(', Config.ALL_ARGS, ')'],
    },
    coalesce: {
        description: 'Returns first non-null value from arguments',
        min_args: 1,
        max_args: Infinity,
        return_type: Config.ANY_TYPE,
        format: ['COALESCE(', Config.ALL_ARGS, ')'],
    },
    ifnull: {
        description: 'Returns first argument if not null otherwise returns second argument',
        min_args: 2,
        max_args: 2,
        return_type: Config.ANY_TYPE,
        format: ['IFNULL(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    instr: {
        description: 'Gets character position of argument two in argument one\'s string',
        min_args: 2,
        max_args: 2,
        return_type: Config.NUMERIC,
        arg_types: [
            Config.STRING,
            Config.STRING,
        ],
        format: ['INSTR(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    hex: {
        description: 'Returns hex value of argument',
        min_args: 1,
        max_args: 1,
        return_type: Config.STRING,
        format: ['HEX(', Config.ARG1, ')'],
    },
    length: {
        description: 'Returns the string length',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.NUMERIC,
        format: ['LENGTH(', Config.ARG1, ')'],
    },
    lower: {
        description: 'Returns string converted to lower case',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['LOWER(', Config.ARG1, ')'],
    },
    ltrim: {
        description: 'Returns left-trimmed string',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['LTRIM(', Config.ARG1, ')'],
    },
    nullif: {
        description: 'Returns null if argument one equals argument two',
        min_args: 2,
        max_args: 2,
        return_type: Config.ANY_TYPE,
        format: ['NULLIF(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    random: {
        description: 'Returns random number (platform dependent)',
        min_args: 0,
        max_args: 0,
        return_type: Config.NUMERIC,
        format: ['RANDOM()'],
    },
    replace: {
        description: 'Searches for argument two and replaces matches with argument three in argument one',
        min_args: 3,
        max_args: 3,
        arg_types: [
            Config.STRING,
            Config.STRING,
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['REPLACE(', Config.ARG1, ', ', Config.ARG2, ', ', Config.ARG3, ')'],
    },
    round: {
        description: 'Returns rounded value of argument one with decimal percision of argument two',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.NUMERIC,
        ],
        return_type: Config.NUMERIC,
        format: ['ROUND(', Config.ALL_ARGS, ')'],
    },
    rtrim: {
        description: 'Returns right-trimmed value',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['RTRIM(', Config.ARG1, ')'],
    },
    substr: {
        description: 'Returns part of argument one string from argument two position with length of argument three',
        min_args: 2,
        max_args: 3,
        arg_types: [
            Config.STRING,
            Config.NUMERIC,
            Config.NUMERIC,
        ],
        return_type: Config.STRING,
        format: ['SUBSTR(', Config.ALL_ARGS, ')'],
    },
    trim: {
        description: 'Returns full trimmed string',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['TRIM(', Config.ARG1, ')'],
    },
    upper: {
        description: 'Returns value converted to upper case',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['UPPER(', Config.ARG1, ')'],
    },
    concat: {
        description: 'Returns multiple strings joined together',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['CONCAT(', Config.ALL_ARGS, ')'],
    },

    /* Date Functions */
    date_format: {
        description: 'Returns date converted converted using format of argument two',
        min_args: 2,
        max_args: 2,
        arg_types: [
            Config.DATE,
            Config.STRING,
        ],
        return_type: Config.STRING,
        format: ['DATE_FORMAT(', Config.ARG1, ', ', Config.ARG2,')'],
    },
    date: {
        description: 'Returns date porition of argument one',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.DATE,
        format: ['DATE(', Config.ARG1, ')'],
    },
    day: {
        description: 'Returns day number of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['DAY(', Config.ARG1, ')'],
    },
    from_unixtime: {
        description: 'Returns date type from unix timestamp',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.NUMERIC,
        ],
        return_type: Config.DATE,
        format: ['FROM_UNIXTIME(', Config.ARG1, ')'],
    },
    hour: {
        description: 'Returns hour portion of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['HOUR(', Config.ARG1, ')'],
    },
    minute: {
        description: 'Returns minute porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['MINUTE(', Config.ARG1, ')'],
    },
    month: {
        description: 'Returns month number porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['MONTH(', Config.ARG1, ')'],
    },
    now: {
        description: 'Returns current time/date',
        min_args: 0,
        max_args: 0,
        return_type: Config.DATE,
        format: ['NOW()'],
    },
    second: {
        description: 'Returns second porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['SECOND(', Config.ARG1, ')'],
    },
    time: {
        description: 'Returns time porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.STRING,
        format: ['TIME(', Config.ARG1, ')'],
    },
    unix_timestamp: {
        description: 'Returns unix timestamp from date',
        min_args: 0,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['UNIX_TIMESTAMP(', Config.ARG1, ')'],
    },
    year: {
        description: 'Returns year porition from date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            Config.DATE,
        ],
        return_type: Config.NUMERIC,
        format: ['YEAR(', Config.ARG1, ')'],
    },

    /* Aggregate functions */
    avg: {
        description: 'Returns average value',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['AVG(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `AVG(DISTINCT ${ args[0] }`;
                }
                return `AVG(${ args[0] }`;
            }],
        },
    },
    count: {
        description: 'Returns count of items',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['COUNT(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `COUNT(DISTINCT ${ args[0] }`;
                }
                return `COUNT(${ args[0] }`;
            }],
        },
    },
    // group_concat(expr[,distinct[,seperator[,order_by_expression,order_by_direction ...]]]);
    group_concat: {
        description: 'Returns the group concatinated string',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            Config.STRING,
            Config.BOOLEAN,
            Config.STRING,
            Config.STRING,
            Config.STRING,
        ],
        return_type: Config.STRING,
        is_group_function: true,
        format: (args, orig_args) => {
            let distinct = (orig_args.length >= 2) && Boolean(Number(orig_args[1].getValue())) ? 'DISTINCT ' : '';
            let seperator = '';
            if (orig_args.length >= 3) {
                if (!orig_args[2].isConstant() && !(orig_args[2].isInstanceOf(NULL))) {
                    throw `Third argument of "group_concat" function must be a constant type`;
                }
                if (!(orig_args[2].isInstanceOf(NULL))) {
                    seperator = ` SEPARATOR ${ args[2] }`;
                }
            }
            let order_bys = new Set;
            if (orig_args.length > 3) {
                // Check to make sure there are always pairs of order_by_expression and order_by_direction
                if (orig_args.length % 2 == 0) {
                    throw `GROUP_CONCAT function must have order_by_expression and order_by_direction in pairs`
                }
                // Inc in order of 2's
                for (let i = 3; i < args.length; i=i+2) {
                    let dir = 'ASC';
                    if (orig_args[i+1].isConstant()) {
                        dir = orig_args[i+1].getValue().toString().toLowerCase() == 'desc' ? 'DESC' : 'ASC';
                    }
                    order_bys.add(`${ args[i] } ${ dir }`);
                }
            }
            let order_by;
            if (order_bys.size) {
                order_by = ` ORDER BY ${ Array.from(order_bys).join(',') }`
            } else {
                order_by = '';
            }
            return `GROUP_CONCAT(${ distinct }${ args[0] }${ order_by }${ seperator })`;
        },
    },
    max: {
        description: 'Returns maximum value',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['MAX(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `MAX(DISTINCT ${ args[0] }`;
                }
                return `MAX(${ args[0] }`;
            }],
        },
    },
    min: {
        description: 'Returns minimum value',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['MIN(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `MIN(DISTINCT ${ args[0] }`;
                }
                return `MIN(${ args[0] }`;
            }],
        },
    },
    sum: {
        description: 'Returns sum of values',
        min_args: 1,
        max_args: 2,
        arg_types: [
            Config.NUMERIC,
            Config.BOOLEAN,
        ],
        return_type: Config.NUMERIC,
        is_group_function: true,
        format: {
            1: ['SUM(', Config.ARG1, ')'],
            2: [(args, orig_args) => {
                let distinct = Boolean(Number(orig_args[1].getValue()));
                if (distinct) {
                    return `SUM(DISTINCT ${ args[0] }`;
                }
                return `SUM(${ args[0] }`;
            }],
        },
    },
    having: {
        description: 'Forces item into having statment',
        min_args: 1,
        max_args: 1,
        return_type: Config.ANY,
        is_group_function: true,
        format: [Config.ARG1],
    }
};

Config.COMPARITORS = new Set([
    EQUAL,
    GREATER_THAN,
    LESS_THAN,
    LIKE,
    NO_VALUE,
    NOT_EQUAL,
    NOT_LIKE,
]);