import { DATA_TYPES } from './data_types.js';
export class Config {
    static ALL_ARGS (args) {
        return args.join(', ');
    };
}

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
{"bill":{"name":"bills","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"invoice_number":{"type":DATA_TYPES.STRING},"purchase_id":{"type":DATA_TYPES.NUMERIC},"invoice_date":{"type":DATA_TYPES.DATE},"notes":{"type":DATA_TYPES.STRING},"payment_status":{"type":DATA_TYPES.NUMERIC},"term_id":{"type":DATA_TYPES.NUMERIC},"due_date":{"type":DATA_TYPES.DATE},"accounting_system_id":{"type":DATA_TYPES.STRING},"vendor_id":{"type":DATA_TYPES.NUMERIC},"effective_date":{"type":DATA_TYPES.DATE},"invoice_amount":{"type":DATA_TYPES.NUMERIC},"shipping_cost":{"type":DATA_TYPES.NUMERIC},"discount_amount":{"type":DATA_TYPES.NUMERIC},"tax_amount":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"date_closed":{"type":DATA_TYPES.DATE},"currency":{"type":DATA_TYPES.STRING},"type":{"type":DATA_TYPES.STRING}},"linkTo":{"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"}},"linkFrom":{"shipment":{"table":"shipment","pql":"eq(shipment.bill_id,id)"},"product_items_bills":{"table":"product_items_bills","pql":"eq(product_items_bills.bill_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Bill\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Bill\")"}}},"booking":{"name":"bookings","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"ship_attn":{"type":DATA_TYPES.STRING},"ship_name":{"type":DATA_TYPES.STRING},"ship_address1":{"type":DATA_TYPES.STRING},"ship_address2":{"type":DATA_TYPES.STRING},"ship_city":{"type":DATA_TYPES.STRING},"ship_state":{"type":DATA_TYPES.STRING},"ship_zip":{"type":DATA_TYPES.STRING},"ship_country":{"type":DATA_TYPES.STRING},"brand_id":{"type":DATA_TYPES.NUMERIC},"date":{"type":DATA_TYPES.DATE},"customer_po":{"type":DATA_TYPES.STRING},"sales_rep_id":{"type":DATA_TYPES.NUMERIC},"total":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"sales_rep":{"table":"sales_rep","pql":"eq(sales_rep_id,sales_rep.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Booking\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Booking\")"}}},"brand":{"name":"brands","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"primary_contact_id":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"brand_names":{"type":DATA_TYPES.STRING},"parent_id":{"type":DATA_TYPES.NUMERIC},"active":{"type":DATA_TYPES.BOOLEAN},"website":{"type":DATA_TYPES.STRING},"temp_mybooks_id":{"type":DATA_TYPES.NUMERIC},"warehouse_use_vendor_num":{"type":DATA_TYPES.BOOLEAN}},"linkTo":{"primary_contact":{"table":"contact","pql":"eq(primary_contact_id,primary_contact.id)"},"parent":{"table":"brand","pql":"eq(parent_id,parent.id)"}},"linkFrom":{"contacts":{"table":"contact","pql":"eq(contacts.brand_id,id)"},"products":{"table":"product","pql":"eq(products.brand_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Brand\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Brand\")"}}},"carrier":{"name":"carriers","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"scac_code":{"type":DATA_TYPES.STRING}},"linkTo":[],"linkFrom":{"shipment_methods":{"table":"shipment_method","pql":"eq(shipment_methods.carrier_id,id)"}}},"contact":{"name":"contacts","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"last_name":{"type":DATA_TYPES.STRING},"address1":{"type":DATA_TYPES.STRING},"address2":{"type":DATA_TYPES.STRING},"city":{"type":DATA_TYPES.STRING},"state":{"type":DATA_TYPES.STRING},"zip":{"type":DATA_TYPES.STRING},"country":{"type":DATA_TYPES.STRING},"email":{"type":DATA_TYPES.STRING},"phone":{"type":DATA_TYPES.STRING},"timezone_id":{"type":DATA_TYPES.NUMERIC},"contact_hours":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"fax":{"type":DATA_TYPES.STRING},"alt_phone":{"type":DATA_TYPES.STRING},"fax_optout":{"type":DATA_TYPES.BOOLEAN},"email_optout":{"type":DATA_TYPES.BOOLEAN},"postal_optout":{"type":DATA_TYPES.BOOLEAN},"customer_id":{"type":DATA_TYPES.NUMERIC},"brand_id":{"type":DATA_TYPES.NUMERIC},"vendor_id":{"type":DATA_TYPES.NUMERIC},"parent_contact_id":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"status":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"timezone":{"table":"timezone","pql":"eq(timezone_id,timezone.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"vendor":{"table":"vendor","pql":"eq(vendor_id,vendor.id)"},"parent_contact":{"table":"contact","pql":"eq(parent_contact_id,parent_contact.id)"}},"linkFrom":{"gateway_accounts":{"table":"gateway_account","pql":"eq(gateway_accounts.billing_contact_id,id)"},"customers_shipping":{"table":"customer","pql":"eq(customers_shipping.primary_shipping_contact_id,id)"},"customers_billing":{"table":"customer","pql":"eq(customers_billing.primary_billing_contact_id,id)"},"customers_primary":{"table":"customer","pql":"eq(customers_primary.primary_contact_id,id)"},"users":{"table":"user","pql":"eq(users.contact_id,id)"},"purchases":{"table":"purchase","pql":"eq(purchases.contact_id,id)"},"brands":{"table":"brand","pql":"eq(brands.contact_id,id)"},"vendors":{"table":"vendor","pql":"eq(vendors.primary_contact_id,id)"},"sales_reps":{"table":"sales_rep","pql":"eq(sales_reps.contact_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Contact\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Contact\")"}}},"control_flag":{"name":"control_flags","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"control_key_id":{"type":DATA_TYPES.NUMERIC},"value":{"type":DATA_TYPES.STRING},"module":{"type":DATA_TYPES.STRING},"item_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"control_key":{"table":"control_key","pql":"eq(control_key_id,control_key.id)"}},"linkFrom":[]},"control_key":{"name":"control_keys","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"key":{"type":DATA_TYPES.STRING},"module_flags":{"type":DATA_TYPES.NUMERIC}},"linkTo":[],"linkFrom":{"control_flags":{"table":"control_flag","pql":"eq(control_flags.control_key_id,id)"}}},"customer":{"name":"customers","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"primary_rep_id":{"type":DATA_TYPES.NUMERIC},"current_credit":{"type":DATA_TYPES.NUMERIC},"max_credit_amount":{"type":DATA_TYPES.NUMERIC},"primary_contact_id":{"type":DATA_TYPES.NUMERIC},"primary_billing_contact_id":{"type":DATA_TYPES.NUMERIC},"primary_shipping_contact_id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"website":{"type":DATA_TYPES.STRING},"term_id":{"type":DATA_TYPES.NUMERIC},"resale_tax_number":{"type":DATA_TYPES.STRING},"territory_id":{"type":DATA_TYPES.NUMERIC},"federal_id":{"type":DATA_TYPES.STRING},"dunns":{"type":DATA_TYPES.STRING},"tax_code_id":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"temp_mybooks_id":{"type":DATA_TYPES.STRING},"status":{"type":DATA_TYPES.NUMERIC},"parent_customer_id":{"type":DATA_TYPES.NUMERIC},"unpaid_invoice_amount":{"type":DATA_TYPES.NUMERIC},"primary_shipment_method_id":{"type":DATA_TYPES.NUMERIC},"primary_shipment_account_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"rep":{"table":"user","pql":"eq(primary_rep_id,rep.id)"},"primary_contact":{"table":"contact","pql":"eq(primary_contact_id,primary_contact.id)"},"billing_contact":{"table":"contact","pql":"eq(primary_billing_contact_id,billing_contact.id)"},"shipping_contact":{"table":"contact","pql":"eq(primary_shipping_contact_id,shipping_contact.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"territory":{"table":"territory","pql":"eq(territory_id,territory.id)"},"tax_code":{"table":"tax_code","pql":"eq(tax_code_id,tax_code.id)"},"parent_customer":{"table":"customer","pql":"eq(parent_customer_id,parent_customer.id)"},"primary_shipment_method":{"table":"shipment_method","pql":"eq(primary_shipment_method_id,primary_shipment_method.id)"},"primary_shipment_account":{"table":"shipment_account","pql":"eq(primary_shipment_account_id,primary_shipment_account.id)"}},"linkFrom":{"gateway_accounts":{"table":"gateway_account","pql":"eq(gateway_accounts.customer_id,id)"},"payments":{"table":"payment","pql":"eq(payments.customer_id,id)"},"invoices":{"table":"invoice","pql":"eq(invoices.customer_id,id)"},"shipments":{"table":"shipment","pql":"eq(shipments.customer_id,id)"},"orders":{"table":"order","pql":"eq(orders.customer_id,id)"},"child_customers":{"table":"customer","pql":"eq(child_customers.parent_customer_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Customer\")"},"customer_franchises":{"table":"customer_franchises","pql":"eq(customer_franchises.customer_id,id)"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Customer\")"},"shipment_accounts":{"table":"shipment_account","pql":"eq(shipment_accounts.customer_id,id)"},"customer_notifications":{"table":"customers_notifications","pql":"eq(customer_notifications.customer_id,id)"}}},"customer_franchises":{"name":"customer_franchises","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"franchise_id":{"type":DATA_TYPES.NUMERIC},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE},"dont_purge":{"type":DATA_TYPES.BOOLEAN}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Customer_Franchises\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Customer_Franchises\")"}}},"customers_notifications":{"name":"customers_notifications","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"type":{"type":DATA_TYPES.STRING},"contact_method":{"type":DATA_TYPES.STRING},"contact_data":{"type":DATA_TYPES.STRING},"contact_name":{"type":DATA_TYPES.STRING}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Customers_Notifications\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Customers_Notifications\")"}}},"cycle_count":{"name":"cycle_counts","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"date_created":{"type":DATA_TYPES.DATE},"date_completed":{"type":DATA_TYPES.DATE},"active":{"type":DATA_TYPES.BOOLEAN}},"linkTo":[],"linkFrom":[]},"draft_item":{"name":"draft_items","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"order_draft_id":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"status":{"type":DATA_TYPES.NUMERIC},"qty":{"type":DATA_TYPES.NUMERIC},"sell_price":{"type":DATA_TYPES.NUMERIC},"discount":{"type":DATA_TYPES.NUMERIC},"sort_order":{"type":DATA_TYPES.NUMERIC},"starin_promo_id":{"type":DATA_TYPES.NUMERIC},"vendor_promo_id":{"type":DATA_TYPES.NUMERIC},"spiff_id":{"type":DATA_TYPES.NUMERIC},"program_id":{"type":DATA_TYPES.NUMERIC},"order_warehouse_id":{"type":DATA_TYPES.NUMERIC},"order_line_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"order_draft":{"table":"order_draft","pql":"eq(order_draft_id,order_draft.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Draft_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Draft_Item\")"}}},"edi_term_code":{"name":"edi_term_codes","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"term_code":{"type":DATA_TYPES.STRING},"description":{"type":DATA_TYPES.STRING}},"linkTo":[],"linkFrom":{"terms":{"table":"term","pql":"eq(terms.edi_term_code_id,id)"}}},"edi_user":{"name":"edi_users","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"contact_id":{"type":DATA_TYPES.NUMERIC},"friendly_name":{"type":DATA_TYPES.STRING},"auth_qualifier":{"type":DATA_TYPES.STRING},"auth_info":{"type":DATA_TYPES.STRING},"security_qualifier":{"type":DATA_TYPES.STRING},"security_info":{"type":DATA_TYPES.STRING},"sender_qualifier":{"type":DATA_TYPES.STRING},"sender_id":{"type":DATA_TYPES.STRING},"receiver_qualifier":{"type":DATA_TYPES.STRING},"receiver_id":{"type":DATA_TYPES.STRING},"control_standard_id":{"type":DATA_TYPES.STRING},"control_version":{"type":DATA_TYPES.STRING},"ack_requested":{"type":DATA_TYPES.STRING},"is_test":{"type":DATA_TYPES.STRING},"sub_element_sep":{"type":DATA_TYPES.STRING},"func_id":{"type":DATA_TYPES.STRING},"application_sender_id":{"type":DATA_TYPES.STRING},"application_receiver_id":{"type":DATA_TYPES.STRING},"responsible_agency_code":{"type":DATA_TYPES.STRING},"version_id":{"type":DATA_TYPES.STRING},"transaction_set_id":{"type":DATA_TYPES.STRING},"element_seperator":{"type":DATA_TYPES.STRING},"tag_seperator":{"type":DATA_TYPES.STRING}},"linkTo":{"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"}},"linkFrom":[]},"employee":{"name":"employees","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"office_id":{"type":DATA_TYPES.NUMERIC},"work_area_location":{"type":DATA_TYPES.STRING},"computer_ip":{"type":DATA_TYPES.STRING},"position":{"type":DATA_TYPES.STRING},"actively_employed":{"type":DATA_TYPES.BOOLEAN},"extension":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING}},"linkTo":{"office":{"table":"office","pql":"eq(office_id,office.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Employee\")"},"users":{"table":"user","pql":"eq(users.user_id,id)"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Employee\")"}}},"event":{"name":"events","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"watch_id":{"type":DATA_TYPES.NUMERIC},"transaction_id":{"type":DATA_TYPES.NUMERIC},"message":{"type":DATA_TYPES.STRING},"date":{"type":DATA_TYPES.DATE},"has_read":{"type":DATA_TYPES.BOOLEAN},"module":{"type":DATA_TYPES.STRING}},"linkTo":{"watch":{"table":"watch","pql":"eq(watch_id,watch.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Event\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Event\")"}}},"franchise":{"name":"franchises","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"primary_brand_id":{"type":DATA_TYPES.NUMERIC},"is_exclude":{"type":DATA_TYPES.BOOLEAN},"is_public":{"type":DATA_TYPES.BOOLEAN},"legacy_id":{"type":DATA_TYPES.STRING},"formula":{"type":DATA_TYPES.STRING},"dealer_col":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"brand":{"table":"brand","pql":"eq(primary_brand_id,brand.id)"}},"linkFrom":{"customer_franchises":{"table":"customer_franchises","pql":"eq(customer_franchises.franchise_id,id)"},"franchise_products":{"table":"franchise_products","pql":"eq(franchise_products.franchise_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Franchise\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Franchise\")"}}},"franchise_products":{"name":"franchise_products","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"franchise_id":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"date_voided":{"type":DATA_TYPES.DATE},"date_created":{"type":DATA_TYPES.DATE},"rule_id":{"type":DATA_TYPES.NUMERIC},"sell_price":{"type":DATA_TYPES.NUMERIC},"sugar_column":{"type":DATA_TYPES.STRING}},"linkTo":{"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Franchise_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Franchise_Products\")"}}},"gateway_account":{"name":"gateway_accounts","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"payment_gateway_id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"billing_contact_id":{"type":DATA_TYPES.NUMERIC},"gateway_ref":{"type":DATA_TYPES.STRING},"additional_ref":{"type":DATA_TYPES.STRING},"is_primary":{"type":DATA_TYPES.BOOLEAN},"last_updated":{"type":DATA_TYPES.DATE},"exp_date":{"type":DATA_TYPES.NUMERIC},"type":{"type":DATA_TYPES.STRING}},"linkTo":{"payment_gateway":{"table":"payment_gateway","pql":"eq(payment_gateway_id,payment_gateway.id)"},"billing_contact":{"table":"contact","pql":"eq(billing_contact_id,billing_contact.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"order_draft":{"table":"order_draft","pql":"eq(order_draft.gateway_account_id,id)"},"orders":{"table":"order","pql":"eq(orders.gateway_account_id,id)"},"remits":{"table":"remit","pql":"eq(remits.gateway_account_id,id)"},"payment_gateway_requests":{"table":"payment_gateway_request","pql":"eq(payment_gateway_requests.gateway_account_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Gateway_Account\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Gateway_Account\")"}}},"groupping_products":{"name":"groupping_products","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"parent_id":{"type":DATA_TYPES.NUMERIC},"child_id":{"type":DATA_TYPES.NUMERIC},"num_of_children_in_parent":{"type":DATA_TYPES.NUMERIC},"discount_percent":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"parent":{"table":"product","pql":"eq(parent_id,parent.id)"},"child":{"table":"product","pql":"eq(child_id,child.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Groupping_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Groupping_Products\")"}}},"invoice":{"name":"invoices_view","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"invoice_date":{"type":DATA_TYPES.DATE},"invoice_status":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"legacy_id":{"type":DATA_TYPES.STRING},"invoice_sum":{"type":DATA_TYPES.NUMERIC},"amount_due":{"type":DATA_TYPES.NUMERIC},"amount_received":{"type":DATA_TYPES.NUMERIC},"shipment_id":{"type":DATA_TYPES.NUMERIC},"age":{"type":DATA_TYPES.NUMERIC},"override_date":{"type":DATA_TYPES.DATE},"invoice_id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"retired_date":{"type":DATA_TYPES.DATE}},"linkTo":{"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.invoice_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.invoice_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.invoice_id,id)"},"invoices_payments":{"table":"invoices_payments","pql":"eq(invoices_payments.invoice_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Invoice\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Invoice\")"}}},"invoices_payments":{"name":"invoices_payments","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"payment_id":{"type":DATA_TYPES.NUMERIC},"invoice_id":{"type":DATA_TYPES.NUMERIC},"applied_amount":{"type":DATA_TYPES.NUMERIC},"date_applied":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE}},"linkTo":{"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Invoices_Payments\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Invoices_Payments\")"}}},"item_exchange":{"name":"item_exchange","fields":{"id":{"type":DATA_TYPES.NUMERIC},"deleted":{"type":DATA_TYPES.BOOLEAN},"product_item_id":{"type":DATA_TYPES.NUMERIC},"from_status":{"type":DATA_TYPES.NUMERIC},"to_status":{"type":DATA_TYPES.NUMERIC},"from_warehouse_id":{"type":DATA_TYPES.NUMERIC},"to_warehouse_id":{"type":DATA_TYPES.NUMERIC},"user_id":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"date":{"type":DATA_TYPES.DATE},"from_product_id":{"type":DATA_TYPES.NUMERIC},"to_product_id":{"type":DATA_TYPES.NUMERIC},"from_cost":{"type":DATA_TYPES.NUMERIC},"to_cost":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"},"from_warehouse":{"table":"office","pql":"eq(from_warehouse_id,from_warehouse.id)"},"to_warehouse":{"table":"office","pql":"eq(to_warehouse_id,to_warehouse.id)"},"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Item_Exchange\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Item_Exchange\")"}}},"kit_item":{"name":"kit_items","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"sort_order":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"product_item_order_kits":{"table":"product_item","pql":"eq(product_item_order_kits.order_kit_id,id)"},"product_item_purchase_kits":{"table":"product_item","pql":"eq(product_item_purchase_kits.purchase_kit_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Kit_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Kit_Item\")"}}},"last_modified":{"name":"last_modifieds","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"date":{"type":DATA_TYPES.DATE},"module":{"type":DATA_TYPES.STRING},"item_id":{"type":DATA_TYPES.NUMERIC},"user_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":[]},"memute":{"name":"memutes","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"module":{"type":DATA_TYPES.STRING},"rule_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"rule":{"table":"rule","pql":"eq(rule_id,rule.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Memute\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Memute\")"}}},"note":{"name":"notes","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"user_id":{"type":DATA_TYPES.NUMERIC},"note":{"type":DATA_TYPES.STRING},"date":{"type":DATA_TYPES.DATE},"public":{"type":DATA_TYPES.BOOLEAN},"module_flags":{"type":DATA_TYPES.NUMERIC},"module_priority":{"type":DATA_TYPES.NUMERIC},"category":{"type":DATA_TYPES.STRING},"code":{"type":DATA_TYPES.STRING},"legacy_id":{"type":DATA_TYPES.STRING},"important":{"type":DATA_TYPES.BOOLEAN}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.note_id,id)"}}},"notes_link":{"name":"notes_link","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"note_id":{"type":DATA_TYPES.NUMERIC},"module":{"type":DATA_TYPES.STRING},"item_id":{"type":DATA_TYPES.NUMERIC},"date":{"type":DATA_TYPES.DATE},"user_id":{"type":DATA_TYPES.NUMERIC},"void":{"type":DATA_TYPES.BOOLEAN}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"},"note":{"table":"note","pql":"eq(note_id,note.id)"},"bill":{"table":"$module","pql":"eq(item_id,bill.id)"},"booking":{"table":"$module","pql":"eq(item_id,booking.id)"},"brand":{"table":"$module","pql":"eq(item_id,brand.id)"},"contact":{"table":"$module","pql":"eq(item_id,contact.id)"},"customer":{"table":"$module","pql":"eq(item_id,customer.id)"},"employee":{"table":"$module","pql":"eq(item_id,employee.id)"},"event":{"table":"$module","pql":"eq(item_id,event.id)"},"franchise":{"table":"$module","pql":"eq(item_id,franchise.id)"},"groupping_products":{"table":"$module","pql":"eq(item_id,groupping_products.id)"},"invoice":{"table":"$module","pql":"eq(item_id,invoice.id)"},"invoices_payments":{"table":"$module","pql":"eq(item_id,invoices_payments.id)"},"kit_item":{"table":"$module","pql":"eq(item_id,kit_item.id)"},"memute":{"table":"$module","pql":"eq(item_id,memute.id)"},"message":{"table":"$module","pql":"eq(item_id,message.id)"},"office":{"table":"$module","pql":"eq(item_id,office.id)"},"order":{"table":"$module","pql":"eq(item_id,order.id)"},"order_draft":{"table":"$module","pql":"eq(item_id,order_draft.id)"},"payment":{"table":"$module","pql":"eq(item_id,payment.id)"},"product":{"table":"$module","pql":"eq(item_id,product.id)"},"product_bar_code":{"table":"$module","pql":"eq(item_id,product_bar_code.id)"},"product_item":{"table":"$module","pql":"eq(item_id,product_item.id)"},"product_item_report":{"table":"$module","pql":"eq(item_id,product_item_report.id)"},"product_item_return":{"table":"$module","pql":"eq(item_id,product_item_return.id)"},"product_items_bills":{"table":"$module","pql":"eq(item_id,product_items_bills.id)"},"products_vendors":{"table":"$module","pql":"eq(item_id,products_vendors.id)"},"program":{"table":"$module","pql":"eq(item_id,program.id)"},"programs_customers":{"table":"$module","pql":"eq(item_id,programs_customers.id)"},"promo":{"table":"$module","pql":"eq(item_id,promo.id)"},"promos_franchises":{"table":"$module","pql":"eq(item_id,promos_franchises.id)"},"promos_products":{"table":"$module","pql":"eq(item_id,promos_products.id)"},"purchase":{"table":"$module","pql":"eq(item_id,purchase.id)"},"purchase_tracking":{"table":"$module","pql":"eq(item_id,purchase_tracking.id)"},"purchase_tracking_item":{"table":"$module","pql":"eq(item_id,purchase_tracking_item.id)"},"return_product_due":{"table":"$module","pql":"eq(item_id,return_product_due.id)"},"rule":{"table":"$module","pql":"eq(item_id,rule.id)"},"sales_rep":{"table":"$module","pql":"eq(item_id,sales_rep.id)"},"shipment":{"table":"$module","pql":"eq(item_id,shipment.id)"},"shipment_in":{"table":"$module","pql":"eq(item_id,shipment_in.id)"},"shipment_method":{"table":"$module","pql":"eq(item_id,shipment_method.id)"},"spiff":{"table":"$module","pql":"eq(item_id,spiff.id)"},"spiffs_franchises":{"table":"$module","pql":"eq(item_id,spiffs_franchises.id)"},"spiffs_products":{"table":"$module","pql":"eq(item_id,spiffs_products.id)"},"tax_code":{"table":"$module","pql":"eq(item_id,tax_code.id)"},"term":{"table":"$module","pql":"eq(item_id,term.id)"},"territory":{"table":"$module","pql":"eq(item_id,territory.id)"},"timezone":{"table":"$module","pql":"eq(item_id,timezone.id)"}},"linkFrom":[]},"office":{"name":"offices","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"foreman_id":{"type":DATA_TYPES.NUMERIC},"address1":{"type":DATA_TYPES.STRING},"address2":{"type":DATA_TYPES.STRING},"city":{"type":DATA_TYPES.STRING},"state":{"type":DATA_TYPES.STRING},"zip":{"type":DATA_TYPES.STRING},"country":{"type":DATA_TYPES.STRING},"phone":{"type":DATA_TYPES.STRING},"private_name":{"type":DATA_TYPES.STRING},"is_primary":{"type":DATA_TYPES.BOOLEAN},"open_hours":{"type":DATA_TYPES.STRING},"is_warehouse":{"type":DATA_TYPES.BOOLEAN}},"linkTo":{"foreman":{"table":"user","pql":"eq(foreman_id,foreman.id)"},"user":{"table":"user","pql":"eq(foreman_id,user.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.warehouse_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.warehouse_id,id)"},"employees":{"table":"employee","pql":"eq(employees.office_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Office\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Office\")"}}},"order":{"name":"orders","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"ship_name":{"type":DATA_TYPES.STRING},"ship_address1":{"type":DATA_TYPES.STRING},"ship_address2":{"type":DATA_TYPES.STRING},"ship_city":{"type":DATA_TYPES.STRING},"ship_state":{"type":DATA_TYPES.STRING},"ship_zip":{"type":DATA_TYPES.STRING},"ship_country":{"type":DATA_TYPES.STRING},"lead_user_id":{"type":DATA_TYPES.NUMERIC},"order_step":{"type":DATA_TYPES.NUMERIC},"order_created":{"type":DATA_TYPES.DATE},"order_modified":{"type":DATA_TYPES.DATE},"notes":{"type":DATA_TYPES.STRING},"term_id":{"type":DATA_TYPES.NUMERIC},"po_number":{"type":DATA_TYPES.STRING},"requested_delivery_date":{"type":DATA_TYPES.DATE},"requested_delivery_date_end":{"type":DATA_TYPES.DATE},"ship_on_date":{"type":DATA_TYPES.DATE},"tax_code_id":{"type":DATA_TYPES.NUMERIC},"notes_public":{"type":DATA_TYPES.STRING},"address_error":{"type":DATA_TYPES.BOOLEAN},"legacy_id":{"type":DATA_TYPES.STRING},"shipment_method_id":{"type":DATA_TYPES.NUMERIC},"shipment_addr_hash":{"type":DATA_TYPES.STRING},"ship_phone":{"type":DATA_TYPES.STRING},"ship_email":{"type":DATA_TYPES.STRING},"ship_attn":{"type":DATA_TYPES.STRING},"ship_id":{"type":DATA_TYPES.NUMERIC},"quote_id":{"type":DATA_TYPES.NUMERIC},"currency":{"type":DATA_TYPES.STRING},"billing_id":{"type":DATA_TYPES.NUMERIC},"gateway_account_id":{"type":DATA_TYPES.NUMERIC},"shipment_account_id":{"type":DATA_TYPES.NUMERIC},"ship_quote_amount":{"type":DATA_TYPES.NUMERIC},"ship_flags":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"lead_user":{"table":"user","pql":"eq(lead_user_id,lead_user.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"tax_code":{"table":"tax_code","pql":"eq(tax_code_id,tax_code.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"bill_override":{"table":"contact","pql":"eq(billing_id,bill_override.id)"},"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"},"shipment_account":{"table":"shipment_account","pql":"eq(shipment_account_id,shipment_account.id)"},"order_draft":{"table":"order_draft","pql":"eq(quote_id,order_draft.id)"}},"linkFrom":{"invoices":{"table":"invoice","pql":"eq(invoices.order_id,id)"},"shipments":{"table":"shipment","pql":"eq(shipments.order_id,id)"},"product_items":{"table":"product_item","pql":"eq(product_items.order_id,id)"},"purchases":{"table":"purchase","pql":"eq(purchases.order_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.order_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.order_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Order\")"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"Order\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Order\")"},"orders_product_items_void":{"table":"orders_product_items_void","pql":"eq(orders_product_items_void.order_id,id)"}}},"order_draft":{"name":"order_drafts","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"ship_attn":{"type":DATA_TYPES.STRING},"ship_name":{"type":DATA_TYPES.STRING},"ship_address1":{"type":DATA_TYPES.STRING},"ship_address2":{"type":DATA_TYPES.STRING},"ship_city":{"type":DATA_TYPES.STRING},"ship_state":{"type":DATA_TYPES.STRING},"ship_zip":{"type":DATA_TYPES.STRING},"ship_country":{"type":DATA_TYPES.STRING},"lead_user_id":{"type":DATA_TYPES.NUMERIC},"order_step":{"type":DATA_TYPES.NUMERIC},"draft_created":{"type":DATA_TYPES.DATE},"term_id":{"type":DATA_TYPES.NUMERIC},"po_number":{"type":DATA_TYPES.STRING},"requested_delivery_date":{"type":DATA_TYPES.DATE},"requested_delivery_date_end":{"type":DATA_TYPES.DATE},"ship_on_date":{"type":DATA_TYPES.DATE},"tax_code_id":{"type":DATA_TYPES.NUMERIC},"shipment_method_id":{"type":DATA_TYPES.NUMERIC},"ship_phone":{"type":DATA_TYPES.STRING},"ship_email":{"type":DATA_TYPES.STRING},"ship_id":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"currency":{"type":DATA_TYPES.STRING},"billing_id":{"type":DATA_TYPES.NUMERIC},"gateway_account_id":{"type":DATA_TYPES.NUMERIC},"ship_flags":{"type":DATA_TYPES.NUMERIC},"shipment_account_id":{"type":DATA_TYPES.NUMERIC},"ship_quote_amount":{"type":DATA_TYPES.NUMERIC},"source":{"type":DATA_TYPES.STRING},"state":{"type":DATA_TYPES.STRING},"reserved_order_id":{"type":DATA_TYPES.NUMERIC},"cart_id":{"type":DATA_TYPES.STRING}},"linkTo":{"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"lead_user":{"table":"user","pql":"eq(lead_user_id,lead_user.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"tax_code":{"table":"tax_code","pql":"eq(tax_code_id,tax_code.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"shipment_account":{"table":"shipment_account","pql":"eq(shipment_account_id,shipment_account.id)"},"reserved_order":{"table":"order","pql":"eq(reserved_order_id,reserved_order.id)"}},"linkFrom":{"orders":{"table":"order","pql":"eq(orders.quote_id,id)"},"draft_items":{"table":"draft_item","pql":"eq(draft_items.order_draft_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Order_Draft\")"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"Order_Draft\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Order_Draft\")"}}},"order_line":{"name":"order_lines","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"customer_part_num":{"type":DATA_TYPES.STRING},"edi_customer_line_id":{"type":DATA_TYPES.STRING},"edi_entered_price":{"type":DATA_TYPES.NUMERIC},"edi_entered_qty":{"type":DATA_TYPES.NUMERIC}},"linkTo":[],"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.order_line_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.order_line_id,id)"},"product_item_returns":{"table":"product_item_return","pql":"eq(product_item_returns.order_line_id,id)"}}},"order_return":{"name":"order_returns","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"date_entered":{"type":DATA_TYPES.DATE},"rma_number":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"date_returned":{"type":DATA_TYPES.DATE},"payment_id":{"type":DATA_TYPES.NUMERIC},"order_id":{"type":DATA_TYPES.NUMERIC},"status":{"type":DATA_TYPES.NUMERIC},"contact_id":{"type":DATA_TYPES.NUMERIC},"type":{"type":DATA_TYPES.STRING},"code":{"type":DATA_TYPES.STRING},"replacement_order_id":{"type":DATA_TYPES.NUMERIC},"vendor_rma_number":{"type":DATA_TYPES.STRING},"office_id":{"type":DATA_TYPES.NUMERIC},"public_note":{"type":DATA_TYPES.STRING}},"linkTo":{"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"},"replacement_order":{"table":"order","pql":"eq(replacement_order_id,replacement_order.id)"},"office":{"table":"office","pql":"eq(office_id,office.id)"}},"linkFrom":{"shipments_ins":{"table":"shipment_in","pql":"eq(shipments_ins.order_return_id,id)"},"return_product_dues":{"table":"return_product_due","pql":"eq(return_product_dues.order_return_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.return_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Order_Return\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Order_Return\")"}}},"orders_product_items_void":{"name":"orders_product_items_void","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"order_id":{"type":DATA_TYPES.NUMERIC},"product_item_id":{"type":DATA_TYPES.NUMERIC},"void_sell_price":{"type":DATA_TYPES.NUMERIC},"order_kit_id":{"type":DATA_TYPES.NUMERIC},"date_canceled":{"type":DATA_TYPES.DATE},"moved_from_order_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"order":{"table":"order","pql":"eq(order_id,order.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"},"orig_order":{"table":"order","pql":"eq(moved_from_order_id,orig_order.id)"}},"linkFrom":[]},"package":{"name":"packages","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"track_code":{"type":DATA_TYPES.STRING},"weight":{"type":DATA_TYPES.NUMERIC},"height":{"type":DATA_TYPES.NUMERIC},"width":{"type":DATA_TYPES.NUMERIC},"length":{"type":DATA_TYPES.NUMERIC},"shipment_id":{"type":DATA_TYPES.NUMERIC},"last_modified":{"type":DATA_TYPES.DATE}},"linkTo":{"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.package_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.package_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.package_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Package\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Package\")"}}},"payment":{"name":"payments","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"reference_number":{"type":DATA_TYPES.STRING},"date_claimed":{"type":DATA_TYPES.DATE},"date_effective":{"type":DATA_TYPES.DATE},"amount_applied":{"type":DATA_TYPES.NUMERIC},"amount_received":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"legacy_id":{"type":DATA_TYPES.STRING},"customer_id":{"type":DATA_TYPES.NUMERIC},"status":{"type":DATA_TYPES.NUMERIC},"date_created":{"type":DATA_TYPES.DATE},"payment_type":{"type":DATA_TYPES.STRING},"fee":{"type":DATA_TYPES.NUMERIC},"freight_refunded":{"type":DATA_TYPES.NUMERIC},"misc_refunded":{"type":DATA_TYPES.NUMERIC},"tax_refunded":{"type":DATA_TYPES.NUMERIC},"refunded_date":{"type":DATA_TYPES.DATE},"refunded_amount":{"type":DATA_TYPES.STRING},"refunded_method":{"type":DATA_TYPES.STRING},"refunded_notes":{"type":DATA_TYPES.STRING},"currency":{"type":DATA_TYPES.STRING}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"payment_gateway_requests":{"table":"payment_gateway_request","pql":"eq(payment_gateway_requests.payment_id,id)"},"remits_payments":{"table":"remits_payments","pql":"eq(remits_payments.payment_id,id)"},"order_returns":{"table":"order_return","pql":"eq(order_returns.payment_id,id)"},"invoices_payments":{"table":"invoices_payments","pql":"eq(invoices_payments.payment_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Payment\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Payment\")"}}},"payment_gateway":{"name":"payment_gateways","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"class_name":{"type":DATA_TYPES.STRING}},"linkTo":[],"linkFrom":{"gateway_accounts":{"table":"gateway_account","pql":"eq(gateway_accounts.payment_gateway_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Payment_Gateway\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Payment_Gateway\")"}}},"payment_gateway_request":{"name":"payment_gateway_requests","fields":{"id":{"type":DATA_TYPES.NUMERIC},"request_type":{"type":DATA_TYPES.STRING},"gateway_account_id":{"type":DATA_TYPES.NUMERIC},"reference":{"type":DATA_TYPES.STRING},"confirmation_num":{"type":DATA_TYPES.STRING},"payment_id":{"type":DATA_TYPES.NUMERIC},"amount":{"type":DATA_TYPES.NUMERIC},"request_date":{"type":DATA_TYPES.DATE},"request_by":{"type":DATA_TYPES.NUMERIC},"approved":{"type":DATA_TYPES.BOOLEAN},"deny_reason":{"type":DATA_TYPES.STRING},"full_request":{"type":DATA_TYPES.STRING},"full_response":{"type":DATA_TYPES.STRING},"deleted":{"type":DATA_TYPES.BOOLEAN}},"linkTo":{"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"},"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"request_user":{"table":"user","pql":"eq(request_by,request_user.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Office\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Office\")"}}},"product":{"name":"products","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"date_created":{"type":DATA_TYPES.DATE},"description":{"type":DATA_TYPES.STRING},"item_code":{"type":DATA_TYPES.STRING},"brand_id":{"type":DATA_TYPES.NUMERIC},"category_id":{"type":DATA_TYPES.NUMERIC},"sort_order":{"type":DATA_TYPES.NUMERIC},"weight":{"type":DATA_TYPES.NUMERIC},"dimension_h":{"type":DATA_TYPES.NUMERIC},"dimension_w":{"type":DATA_TYPES.NUMERIC},"dimension_l":{"type":DATA_TYPES.NUMERIC},"list_price":{"type":DATA_TYPES.NUMERIC},"map_price":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"vendor_part_number":{"type":DATA_TYPES.STRING},"primary_vendor_id":{"type":DATA_TYPES.NUMERIC},"status":{"type":DATA_TYPES.NUMERIC},"taxable":{"type":DATA_TYPES.BOOLEAN},"freight_only":{"type":DATA_TYPES.BOOLEAN},"upc_code":{"type":DATA_TYPES.STRING},"replacement_id":{"type":DATA_TYPES.NUMERIC},"bin_location":{"type":DATA_TYPES.STRING},"has_internal_serial":{"type":DATA_TYPES.BOOLEAN},"has_external_serial":{"type":DATA_TYPES.BOOLEAN},"ht_code":{"type":DATA_TYPES.STRING},"date_discontinued":{"type":DATA_TYPES.DATE},"master_pack_qty":{"type":DATA_TYPES.NUMERIC},"automation_flags":{"type":DATA_TYPES.NUMERIC},"primary_warehouse_id":{"type":DATA_TYPES.NUMERIC},"date_changed":{"type":DATA_TYPES.DATE},"default_stock_type":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"primary_vendor":{"table":"vendor","pql":"eq(primary_vendor_id,primary_vendor.id)"},"replacement":{"table":"product","pql":"eq(replacement_id,replacement.id)"},"primary_warehouse":{"table":"office","pql":"eq(primary_warehouse_id,primary_warehouse.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.product_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.product_id,id)"},"children":{"table":"groupping_products","pql":"eq(children.child_id,id)"},"parent":{"table":"groupping_products","pql":"eq(parent.parent_id,id)"},"products_vendors":{"table":"products_vendors","pql":"eq(products_vendors.product_id,id)"},"product_bar_codes":{"table":"product_bar_code","pql":"eq(product_bar_codes.product_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product\")"},"franchise_products":{"table":"franchise_products","pql":"eq(franchise_products.product_id,id)"}}},"product_bar_code":{"name":"product_bar_codes","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"bar_code":{"type":DATA_TYPES.STRING},"product_id":{"type":DATA_TYPES.NUMERIC},"type":{"type":DATA_TYPES.STRING}},"linkTo":{"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Bar_Code\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Bar_Code\")"}}},"product_item":{"name":"product_items","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"serial_number":{"type":DATA_TYPES.STRING},"warehouse_id":{"type":DATA_TYPES.NUMERIC},"warehouse_location":{"type":DATA_TYPES.STRING},"date_received":{"type":DATA_TYPES.DATE},"date_shipped":{"type":DATA_TYPES.DATE},"status":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"item_cost":{"type":DATA_TYPES.NUMERIC},"roi_cost":{"type":DATA_TYPES.NUMERIC},"purchase_id":{"type":DATA_TYPES.NUMERIC},"order_id":{"type":DATA_TYPES.NUMERIC},"sell_price":{"type":DATA_TYPES.NUMERIC},"invoice_id":{"type":DATA_TYPES.NUMERIC},"shipment_id":{"type":DATA_TYPES.NUMERIC},"sales_rep_id":{"type":DATA_TYPES.NUMERIC},"sort_order":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"tax_amount":{"type":DATA_TYPES.NUMERIC},"temp_cust_id":{"type":DATA_TYPES.STRING},"shipment_in_id":{"type":DATA_TYPES.NUMERIC},"vendor_serial":{"type":DATA_TYPES.STRING},"override_date":{"type":DATA_TYPES.DATE},"order_kit_id":{"type":DATA_TYPES.NUMERIC},"purchase_kit_id":{"type":DATA_TYPES.NUMERIC},"discount":{"type":DATA_TYPES.NUMERIC},"starin_promo_id":{"type":DATA_TYPES.NUMERIC},"vendor_promo_id":{"type":DATA_TYPES.NUMERIC},"spiff_id":{"type":DATA_TYPES.NUMERIC},"program_id":{"type":DATA_TYPES.NUMERIC},"package_id":{"type":DATA_TYPES.NUMERIC},"has_changed":{"type":DATA_TYPES.BOOLEAN},"order_warehouse_id":{"type":DATA_TYPES.NUMERIC},"stock_type":{"type":DATA_TYPES.STRING},"order_line_id":{"type":DATA_TYPES.NUMERIC},"purchase_tracking_item_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"warehouse":{"table":"office","pql":"eq(warehouse_id,warehouse.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"},"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"},"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"},"sales_rep":{"table":"sales_rep","pql":"eq(sales_rep_id,sales_rep.id)"},"shipment_in":{"table":"shipment_in","pql":"eq(shipment_in_id,shipment_in.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"purchase_kit":{"table":"kit_item","pql":"eq(purchase_kit_id,purchase_kit.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"package":{"table":"package","pql":"eq(package_id,package.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"},"purchase_tracking_item":{"table":"purchase_tracking_item","pql":"eq(purchase_tracking_item_id,purchase_tracking_item.id)"}},"linkFrom":{"product_items_bills":{"table":"product_items_bills","pql":"eq(product_items_bills.product_item_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.product_item_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Item\")"}}},"product_item_report":{"name":"product_items_reports","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"serial_number":{"type":DATA_TYPES.STRING},"warehouse_id":{"type":DATA_TYPES.NUMERIC},"warehouse_location":{"type":DATA_TYPES.STRING},"date_received":{"type":DATA_TYPES.DATE},"date_shipped":{"type":DATA_TYPES.DATE},"status":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"item_cost":{"type":DATA_TYPES.NUMERIC},"roi_cost":{"type":DATA_TYPES.NUMERIC},"purchase_id":{"type":DATA_TYPES.NUMERIC},"order_id":{"type":DATA_TYPES.NUMERIC},"sell_price":{"type":DATA_TYPES.NUMERIC},"invoice_id":{"type":DATA_TYPES.NUMERIC},"shipment_id":{"type":DATA_TYPES.NUMERIC},"sales_rep_id":{"type":DATA_TYPES.NUMERIC},"sort_order":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"tax_amount":{"type":DATA_TYPES.NUMERIC},"temp_cust_id":{"type":DATA_TYPES.STRING},"shipment_in_id":{"type":DATA_TYPES.NUMERIC},"vendor_serial":{"type":DATA_TYPES.STRING},"return_id":{"type":DATA_TYPES.NUMERIC},"override_date":{"type":DATA_TYPES.DATE},"order_kit_id":{"type":DATA_TYPES.NUMERIC},"purchase_kit_id":{"type":DATA_TYPES.NUMERIC},"discount":{"type":DATA_TYPES.NUMERIC},"starin_promo_id":{"type":DATA_TYPES.NUMERIC},"vendor_promo_id":{"type":DATA_TYPES.NUMERIC},"spiff_id":{"type":DATA_TYPES.NUMERIC},"program_id":{"type":DATA_TYPES.NUMERIC},"package_id":{"type":DATA_TYPES.NUMERIC},"has_changed":{"type":DATA_TYPES.BOOLEAN},"order_warehouse_id":{"type":DATA_TYPES.NUMERIC},"order_line_id":{"type":DATA_TYPES.NUMERIC},"source":{"type":DATA_TYPES.STRING},"stock_type":{"type":DATA_TYPES.STRING},"purchase_tracking_item_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"warehouse":{"table":"office","pql":"eq(warehouse_id,warehouse.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"},"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"},"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"},"sales_rep":{"table":"sales_rep","pql":"eq(sales_rep_id,sales_rep.id)"},"shipment_in":{"table":"shipment_in","pql":"eq(shipment_in_id,shipment_in.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"purchase_kit":{"table":"kit_item","pql":"eq(purchase_kit_id,purchase_kit.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"package":{"table":"package","pql":"eq(package_id,package.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"},"purchase_tracking_item":{"table":"purchase_tracking_item","pql":"eq(purchase_tracking_item_id,purchase_tracking_item.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,product_item_id) eq(notes_links.module,\"Product_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,product_item_id) eq(last_modified.module,\"Product_Item\")"}}},"product_item_return":{"name":"product_items_returns","fields":{"id":{"type":DATA_TYPES.NUMERIC},"deleted":{"type":DATA_TYPES.BOOLEAN},"product_item_id":{"type":DATA_TYPES.NUMERIC},"return_id":{"type":DATA_TYPES.NUMERIC},"return_sell_price":{"type":DATA_TYPES.NUMERIC},"restock_fee":{"type":DATA_TYPES.NUMERIC},"invoice_id":{"type":DATA_TYPES.NUMERIC},"shipment_id":{"type":DATA_TYPES.NUMERIC},"order_id":{"type":DATA_TYPES.NUMERIC},"status":{"type":DATA_TYPES.NUMERIC},"date_shipped":{"type":DATA_TYPES.DATE},"date_return_received":{"type":DATA_TYPES.DATE},"sort_order":{"type":DATA_TYPES.NUMERIC},"sales_rep_id":{"type":DATA_TYPES.NUMERIC},"sell_price":{"type":DATA_TYPES.NUMERIC},"tax_amount":{"type":DATA_TYPES.NUMERIC},"shipment_in_id":{"type":DATA_TYPES.NUMERIC},"override_date":{"type":DATA_TYPES.DATE},"discount":{"type":DATA_TYPES.NUMERIC},"starin_promo_id":{"type":DATA_TYPES.NUMERIC},"vendor_promo_id":{"type":DATA_TYPES.NUMERIC},"spiff_id":{"type":DATA_TYPES.NUMERIC},"program_id":{"type":DATA_TYPES.NUMERIC},"package_id":{"type":DATA_TYPES.NUMERIC},"order_kit_id":{"type":DATA_TYPES.NUMERIC},"order_warehouse_id":{"type":DATA_TYPES.NUMERIC},"order_line_id":{"type":DATA_TYPES.NUMERIC},"stock_type":{"type":DATA_TYPES.STRING}},"linkTo":{"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"},"order_return":{"table":"order_return","pql":"eq(return_id,order_return.id)"},"invoice":{"table":"invoice","pql":"eq(invoice_id,invoice.id)"},"shipment":{"table":"shipment","pql":"eq(shipment_id,shipment.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"},"sales_rep":{"table":"user","pql":"eq(sales_rep_id,sales_rep.id)"},"shipment_in":{"table":"shipment_in","pql":"eq(shipment_in_id,shipment_in.id)"},"order_kit":{"table":"kit_item","pql":"eq(order_kit_id,order_kit.id)"},"starin_promo":{"table":"promo","pql":"eq(starin_promo_id,starin_promo.id)"},"vendor_promo":{"table":"promo","pql":"eq(vendor_promo_id,vendor_promo.id)"},"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"program":{"table":"program","pql":"eq(program_id,program.id)"},"package":{"table":"package","pql":"eq(package_id,package.id)"},"order_warehouse":{"table":"office","pql":"eq(order_warehouse_id,order_warehouse.id)"},"order_line":{"table":"order_line","pql":"eq(order_line_id,order_line.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Item_Return\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Item_Return\")"}}},"product_items_bills":{"name":"product_items_bills","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"product_item_id":{"type":DATA_TYPES.NUMERIC},"bill_id":{"type":DATA_TYPES.NUMERIC},"item_cost":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"bill":{"table":"bill","pql":"eq(bill_id,bill.id)"},"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Item_Bills\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Item_Bills\")"}}},"products_vendors":{"name":"products_vendors","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"vendor_id":{"type":DATA_TYPES.NUMERIC},"cost":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"product":{"table":"product","pql":"eq(product_id,product.id)"},"vendor":{"table":"vendor","pql":"eq(vendor_id,vendor.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Product_Vendors\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Product_Vendors\")"}}},"program":{"name":"programs","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"start_date":{"type":DATA_TYPES.DATE},"end_date":{"type":DATA_TYPES.DATE},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE},"brand_id":{"type":DATA_TYPES.NUMERIC},"rule_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"brand":{"table":"brand","pql":"eq(brand_id,brand.id)"},"rule":{"table":"rule","pql":"eq(rule_id,rule.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.program_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.program_id,id)"},"product_item_returns":{"table":"product_item_returns","pql":"eq(product_item_returns.program_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Program\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Program\")"}}},"programs_customers":{"name":"programs_customers","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"program_id":{"type":DATA_TYPES.STRING},"customer_id":{"type":DATA_TYPES.DATE},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE},"parameters":{"type":DATA_TYPES.STRING}},"linkTo":{"program":{"table":"program","pql":"eq(program_id,program.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Programs_Customers\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Programs_Customers\")"}}},"promo":{"name":"promos","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"start_date":{"type":DATA_TYPES.DATE},"end_date":{"type":DATA_TYPES.DATE},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE},"type":{"type":DATA_TYPES.STRING},"rule_id":{"type":DATA_TYPES.NUMERIC},"brand_id":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"promo_code":{"type":DATA_TYPES.STRING},"before_order_rule_id":{"type":DATA_TYPES.NUMERIC},"after_invoice_rule_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"rule":{"table":"rule","pql":"eq(rule_id,rule.id)"},"brand_id":{"table":"brand","pql":"eq(brand_id,brand_id.id)"}},"linkFrom":{"product_item_starin_promos":{"table":"product_item","pql":"eq(product_item_starin_promos.starin_promo_id,id)"},"product_item_vendor_promos":{"table":"product_item","pql":"eq(product_item_vendor_promos.vendor_promo_id,id)"},"product_item_return_starin_promos":{"table":"product_item_return","pql":"eq(product_item_return_starin_promos.starin_promo_id,id)"},"product_item_return_vendor_promos":{"table":"product_item_return","pql":"eq(product_item_return_vendor_promos.vendor_promo_id,id)"},"product_item_report_starin_promos":{"table":"product_item_report","pql":"eq(product_item_report_starin_promos.starin_promo_id,id)"},"product_item_report_vendor_promos":{"table":"product_item_report","pql":"eq(product_item_report_vendor_promos.vendor_promo_id,id)"},"promos_franchises":{"table":"promos_franchises","pql":"eq(promos_franchises.promo_id,id)"},"promos_products":{"table":"promos_products","pql":"eq(promos_products.promo_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Promo\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Promo\")"}}},"promos_franchises":{"name":"promos_franchises","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"promo_id":{"type":DATA_TYPES.NUMERIC},"franchise_id":{"type":DATA_TYPES.NUMERIC},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE}},"linkTo":{"promo":{"table":"promo","pql":"eq(promo_id,promo.id)"},"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Promos_Franchises\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Promos_Franchises\")"}}},"promos_products":{"name":"promos_products","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"promo_id":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE},"description":{"type":DATA_TYPES.STRING}},"linkTo":{"promo":{"table":"promo","pql":"eq(promo_id,promo.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Promos_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Promos_Products\")"}}},"purchase":{"name":"purchases","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"vendor_id":{"type":DATA_TYPES.NUMERIC},"date_ordered":{"type":DATA_TYPES.DATE},"notes":{"type":DATA_TYPES.STRING},"status":{"type":DATA_TYPES.NUMERIC},"term_id":{"type":DATA_TYPES.NUMERIC},"shipment_method_id":{"type":DATA_TYPES.NUMERIC},"assigned_user_id":{"type":DATA_TYPES.NUMERIC},"sub_total":{"type":DATA_TYPES.NUMERIC},"tax":{"type":DATA_TYPES.NUMERIC},"freight":{"type":DATA_TYPES.NUMERIC},"misc":{"type":DATA_TYPES.NUMERIC},"total":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"office_id":{"type":DATA_TYPES.NUMERIC},"order_id":{"type":DATA_TYPES.NUMERIC},"notes_public":{"type":DATA_TYPES.STRING},"ship_account_num":{"type":DATA_TYPES.STRING},"est_received_date":{"type":DATA_TYPES.DATE},"vendor_order_number":{"type":DATA_TYPES.STRING}},"linkTo":{"vendor":{"table":"vendor","pql":"eq(vendor_id,vendor.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"assigned_user":{"table":"user","pql":"eq(assigned_user_id,assigned_user.id)"},"office":{"table":"office","pql":"eq(office_id,office.id)"},"order":{"table":"order","pql":"eq(order_id,order.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.purchase_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.purchase_id,id)"},"bills":{"table":"bill","pql":"eq(bills.purchase_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Purchase\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Purchase\")"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"Purchase\")"}}},"purchase_tracking":{"name":"purchase_tracking","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"purchase_id":{"type":DATA_TYPES.NUMERIC},"estimated_receive_date":{"type":DATA_TYPES.DATE},"tracking_number":{"type":DATA_TYPES.STRING},"shipment_method_id":{"type":DATA_TYPES.NUMERIC},"last_updated":{"type":DATA_TYPES.DATE},"variance":{"type":DATA_TYPES.NUMERIC},"note":{"type":DATA_TYPES.STRING},"ref_number":{"type":DATA_TYPES.STRING}},"linkTo":{"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"}},"linkFrom":{"purchase_tracking_items":{"table":"purchase_tracking_item","pql":"eq(purchase_tracking_items.purchase_tracking_id,id)"},"control_flags":{"table":"control_flag","pql":"eq(control_flags.item_id,id) eq(control_flags.module,\"PURCHASE_TRACKING\")"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Purchase_Tracking\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Purchase_Tracking\")"}}},"purchase_tracking_item":{"name":"purchase_tracking_items","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"purchase_tracking_id":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"stock_type":{"type":DATA_TYPES.STRING},"qty":{"type":DATA_TYPES.NUMERIC},"qty_received":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"purchase_tracking":{"table":"purchase_tracking","pql":"eq(purchase_tracking_id,purchase_tracking.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.purchase_tracking_item_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.purchase_tracking_item_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Purchase_Tracking_Item\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Purchase_Tracking_Item\")"}}},"remit":{"name":"remits","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"paid":{"type":DATA_TYPES.BOOLEAN},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE},"amount_due":{"type":DATA_TYPES.NUMERIC},"gateway_account_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"gateway_account":{"table":"gateway_account","pql":"eq(gateway_account_id,gateway_account.id)"}},"linkFrom":{"shipments":{"table":"shipment","pql":"eq(shipments.remit_id,id)"},"remits_payments":{"table":"remits_payments","pql":"eq(remits_payments.remit_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Remit\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Remit\")"}}},"remits_payments":{"name":"remits_payments","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"remit_id":{"type":DATA_TYPES.NUMERIC},"payment_id":{"type":DATA_TYPES.NUMERIC},"amount":{"type":DATA_TYPES.NUMERIC},"date_applied":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE}},"linkTo":{"payment":{"table":"payment","pql":"eq(payment_id,payment.id)"},"remit":{"table":"remit","pql":"eq(remit_id,remit.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Remits_Payments\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Remits_Payments\")"}}},"return_product_due":{"name":"return_product_due","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"product_item_id":{"type":DATA_TYPES.NUMERIC},"order_return_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"order_return":{"table":"order_return","pql":"eq(order_return_id,order_return.id)"},"product_item":{"table":"product_item","pql":"eq(product_item_id,product_item.id)"}},"linkFrom":[]},"rule":{"name":"rules","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"code":{"type":DATA_TYPES.STRING},"file":{"type":DATA_TYPES.STRING}},"linkTo":[],"linkFrom":[]},"sales_rep":{"name":"sales_reps","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"contact_id":{"type":DATA_TYPES.NUMERIC},"user_id":{"type":DATA_TYPES.NUMERIC},"assigned_user_id":{"type":DATA_TYPES.NUMERIC},"is_distributor":{"type":DATA_TYPES.BOOLEAN},"notes":{"type":DATA_TYPES.STRING},"legacy_id":{"type":DATA_TYPES.STRING}},"linkTo":{"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"},"user":{"table":"user","pql":"eq(user_id,user.id)"},"assigned_user":{"table":"user","pql":"eq(assigned_user_id,assigned_user.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.sales_rep_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Sales_Rep\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Sales_Rep\")"}}},"shipment":{"name":"shipments","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"shipment_method_id":{"type":DATA_TYPES.NUMERIC},"track_code":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"actual_cost":{"type":DATA_TYPES.NUMERIC},"ship_date":{"type":DATA_TYPES.DATE},"date_due":{"type":DATA_TYPES.DATE},"shipment_fee":{"type":DATA_TYPES.NUMERIC},"handling_fee":{"type":DATA_TYPES.NUMERIC},"flags":{"type":DATA_TYPES.NUMERIC},"shipment_addr_hash":{"type":DATA_TYPES.STRING},"customer_id":{"type":DATA_TYPES.NUMERIC},"bill_id":{"type":DATA_TYPES.NUMERIC},"term_id":{"type":DATA_TYPES.NUMERIC},"backorder_hash":{"type":DATA_TYPES.STRING},"remit_id":{"type":DATA_TYPES.NUMERIC},"discount_amount":{"type":DATA_TYPES.NUMERIC},"shipment_account_id":{"type":DATA_TYPES.NUMERIC},"shipment_flags":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"bill":{"table":"bill","pql":"eq(bill_id,bill.id)"},"term":{"table":"term","pql":"eq(term_id,term.id)"},"remit":{"table":"remit","pql":"eq(remit_id,remit.id)"},"shipment_account":{"table":"shipment_account","pql":"eq(shipment_account_id,shipment_account.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.shipment_id,id)"},"product_items_returns":{"table":"product_item_return","pql":"eq(product_items_returns.shipment_id,id)"},"product_items_reports":{"table":"product_item_report","pql":"eq(product_items_reports.shipment_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment\")"},"invoices":{"table":"invoice","pql":"eq(invoices.shipment_id,id)"}}},"shipment_account":{"name":"shipment_accounts","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"customer_id":{"type":DATA_TYPES.NUMERIC},"shipment_method_id":{"type":DATA_TYPES.NUMERIC},"ship_account_num":{"type":DATA_TYPES.STRING},"third_party_contact_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"},"third_party_contact":{"table":"contact","pql":"eq(third_party_contact_id,third_party_contact.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment_Account\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment_Account\")"}}},"shipment_in":{"name":"shipments_in","fields":{"id":{"type":DATA_TYPES.NUMERIC},"deleted":{"type":DATA_TYPES.BOOLEAN},"date_entered":{"type":DATA_TYPES.DATE},"purchase_id":{"type":DATA_TYPES.NUMERIC},"order_return_id":{"type":DATA_TYPES.NUMERIC},"notes":{"type":DATA_TYPES.STRING},"track_code":{"type":DATA_TYPES.STRING},"office_id":{"type":DATA_TYPES.NUMERIC},"shipment_method_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"purchase":{"table":"purchase","pql":"eq(purchase_id,purchase.id)"},"order_return":{"table":"order_return","pql":"eq(order_return_id,order_return.id)"},"office":{"table":"office","pql":"eq(office_id,office.id)"},"shipment_method":{"table":"shipment_method","pql":"eq(shipment_method_id,shipment_method.id)"}},"linkFrom":{"product_items":{"table":"product_item","pql":"eq(product_items.shipment_in_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment_In\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment_In\")"}}},"shipment_method":{"name":"shipment_methods","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"customer_id":{"type":DATA_TYPES.NUMERIC},"prepaid":{"type":DATA_TYPES.BOOLEAN},"carrier_code":{"type":DATA_TYPES.STRING},"carrier":{"type":DATA_TYPES.STRING},"parent_shipment_method_id":{"type":DATA_TYPES.NUMERIC},"carrier_id":{"type":DATA_TYPES.NUMERIC},"transportaion_method_code":{"type":DATA_TYPES.STRING},"is_freight":{"type":DATA_TYPES.BOOLEAN},"time_in_transit":{"type":DATA_TYPES.NUMERIC},"service_level_code":{"type":DATA_TYPES.STRING}},"linkTo":{"customer":{"table":"customer","pql":"eq(customer_id,customer.id)"},"parent_shipment_method":{"table":"shipment_method","pql":"eq(parent_shipment_method_id,parent_shipment_method.id)"},"scac":{"table":"carrier","pql":"eq(carrier_id,scac.id)"}},"linkFrom":{"purchases":{"table":"purchase","pql":"eq(purchases.shipment_method_id,id)"},"shipments":{"table":"shipment","pql":"eq(shipments.shipment_method_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Shipment_Method\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Shipment_Method\")"},"child_shipment_methods":{"table":"shipment_method","pql":"eq(child_shipment_methods.parent_shipment_method_id,id)"},"shipment_accounts":{"table":"shipment_account","pql":"eq(shipment_accounts.shipment_method_id,id)"}}},"spiff":{"name":"spiffs","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"start_date":{"type":DATA_TYPES.DATE},"end_date":{"type":DATA_TYPES.DATE},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE},"notes":{"type":DATA_TYPES.STRING},"max":{"type":DATA_TYPES.NUMERIC}},"linkTo":[],"linkFrom":{"spiffs_franchises":{"table":"spiffs_franchises","pql":"eq(spiffs_franchises.spiff_id,id)"},"spiffs_products":{"table":"spiffs_products","pql":"eq(spiffs_products.spiff_id,id)"},"product_items":{"table":"product_item","pql":"eq(product_items.spiff_id,id)"},"product_item_returns":{"table":"product_item_return","pql":"eq(product_item_returns.spiff_id,id)"},"product_item_reports":{"table":"product_item_report","pql":"eq(product_item_reports.spiff_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Spiff\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Spiff\")"}}},"spiffs_franchises":{"name":"spiffs_franchises","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"spiff_id":{"type":DATA_TYPES.NUMERIC},"franchise_id":{"type":DATA_TYPES.NUMERIC},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE}},"linkTo":{"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"franchise":{"table":"franchise","pql":"eq(franchise_id,franchise.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Spiff_Franchises\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Spiff_Franchises\")"}}},"spiffs_products":{"name":"spiffs_products","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"spiff_id":{"type":DATA_TYPES.NUMERIC},"product_id":{"type":DATA_TYPES.NUMERIC},"qty":{"type":DATA_TYPES.NUMERIC},"date_created":{"type":DATA_TYPES.DATE},"date_voided":{"type":DATA_TYPES.DATE}},"linkTo":{"spiff":{"table":"spiff","pql":"eq(spiff_id,spiff.id)"},"product":{"table":"product","pql":"eq(product_id,product.id)"}},"linkFrom":{"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Spiffs_Products\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Spiffs_Products\")"}}},"tax_code":{"name":"tax_codes","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"percentage":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"shipment_tax":{"type":DATA_TYPES.NUMERIC}},"linkTo":[],"linkFrom":{"orders":{"table":"order","pql":"eq(orders.tax_code_id,id)"},"customers":{"table":"customer","pql":"eq(customers.tax_code_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Tax_Code\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Tax_Code\")"}}},"term":{"name":"terms","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"due_days":{"type":DATA_TYPES.NUMERIC},"discount":{"type":DATA_TYPES.NUMERIC},"discount_days":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"order_override_flags":{"type":DATA_TYPES.NUMERIC},"classification":{"type":DATA_TYPES.STRING},"grace_days":{"type":DATA_TYPES.NUMERIC},"edi_term_code_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"edi_term_code":{"table":"edi_term_code","pql":"eq(edi_term_code_id,edi_term_code.id)"}},"linkFrom":{"purchases":{"table":"purchase","pql":"eq(purchases.term_id,id)"},"bills":{"table":"bill","pql":"eq(bills.term_id,id)"},"customers":{"table":"customer","pql":"eq(customers.term_id,id)"},"vendors":{"table":"vendor","pql":"eq(vendors.term_id,id)"},"orders":{"table":"order","pql":"eq(orders.term_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Term\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Term\")"}}},"territory":{"name":"territories","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"legacy_id":{"type":DATA_TYPES.STRING},"country":{"type":DATA_TYPES.STRING},"region":{"type":DATA_TYPES.STRING},"state_province":{"type":DATA_TYPES.STRING}},"linkTo":[],"linkFrom":{"customers":{"table":"customer","pql":"eq(customers.territory_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Territory\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Territory\")"}}},"timezone":{"name":"timezones","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"utc":{"type":DATA_TYPES.STRING},"dst":{"type":DATA_TYPES.STRING}},"linkTo":[],"linkFrom":{"contacts":{"table":"contact","pql":"eq(contacts.timezone_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Timezone\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Timezone\")"}}},"user":{"name":"users_view","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"username":{"type":DATA_TYPES.STRING},"password":{"type":DATA_TYPES.STRING},"can_login":{"type":DATA_TYPES.BOOLEAN},"employee_id":{"type":DATA_TYPES.NUMERIC},"contact_id":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"wh_scan":{"type":DATA_TYPES.STRING}},"linkTo":{"employee":{"table":"employee","pql":"eq(employee_id,employee.id)"},"contact":{"table":"contact","pql":"eq(contact_id,contact.id)"}},"linkFrom":{"user_historys":{"table":"user_history","pql":"eq(user_historys.user_id,id)"},"voided_gateway_requests":{"table":"payment_gateway_request","pql":"eq(voided_gateway_requests.void_by,id)"},"approved_gateway_requests":{"table":"payment_gateway_request","pql":"eq(approved_gateway_requests.approved_by,id)"},"requested_gateway_requests":{"table":"payment_gateway_request","pql":"eq(requested_gateway_requests.request_by,id)"},"offices":{"table":"office","pql":"eq(offices.foreman_id,id)"},"customers":{"table":"customer","pql":"eq(customers.primary_rep_id,id)"},"purchases":{"table":"purchase","pql":"eq(purchases.assigned_user_id,id)"},"orders":{"table":"order","pql":"eq(orders.assigned_user_id,id)"},"sales_reps":{"table":"sales_rep","pql":"eq(sales_reps.user_id,id)"},"assigned_sales_reps":{"table":"sales_rep","pql":"eq(assigned_sales_reps.assigned_user_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"User\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"User\")"}}},"user_history":{"name":"user_historys","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"user_id":{"type":DATA_TYPES.NUMERIC},"method":{"type":DATA_TYPES.STRING},"args":{"type":DATA_TYPES.STRING},"window_id":{"type":DATA_TYPES.NUMERIC},"date":{"type":DATA_TYPES.DATE}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"}},"linkFrom":[]},"vendor":{"name":"vendors","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"name":{"type":DATA_TYPES.STRING},"notes":{"type":DATA_TYPES.STRING},"primary_contact_id":{"type":DATA_TYPES.NUMERIC},"term_id":{"type":DATA_TYPES.NUMERIC},"legacy_id":{"type":DATA_TYPES.STRING},"temp_mybooks_id":{"type":DATA_TYPES.STRING},"our_account_number":{"type":DATA_TYPES.STRING},"default_shipment_method_id":{"type":DATA_TYPES.NUMERIC},"default_office_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"term":{"table":"term","pql":"eq(term_id,term.id)"},"primary_contact":{"table":"contact","pql":"eq(primary_contact_id,primary_contact.id)"},"default_shipment_method":{"table":"shipment_method","pql":"eq(default_shipment_method_id,default_shipment_method.id)"},"default_office":{"table":"office","pql":"eq(default_office_id,default_office.id)"}},"linkFrom":{"purchases":{"table":"purchase","pql":"eq(purchases.vendor_id,id)"},"contacts":{"table":"contact","pql":"eq(contacts.vendor_id,id)"},"primary_products":{"table":"product","pql":"eq(primary_products.vendor_id,id)"},"bills":{"table":"bill","pql":"eq(bills.vendor_id,id)"},"products_vendors":{"table":"products_vendors","pql":"eq(products_vendors.vendor_id,id)"},"notes_links":{"table":"notes_link","pql":"eq(notes_links.item_id,id) eq(notes_links.module,\"Vendor\")"},"last_modified":{"table":"last_modified","pql":"eq(last_modified.item_id,id) eq(last_modified.module,\"Vendor\")"}}},"watch":{"name":"watchs","fields":{"deleted":{"type":DATA_TYPES.BOOLEAN},"id":{"type":DATA_TYPES.NUMERIC},"user_id":{"type":DATA_TYPES.NUMERIC},"record_id":{"type":DATA_TYPES.NUMERIC},"created":{"type":DATA_TYPES.DATE},"note":{"type":DATA_TYPES.STRING},"memute_id":{"type":DATA_TYPES.NUMERIC}},"linkTo":{"user":{"table":"user","pql":"eq(user_id,user.id)"},"memute":{"table":"memute","pql":"eq(memute_id,memute.id)"}},"linkFrom":[]}};


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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.BOOLEAN,
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
        return_type: DATA_TYPES.ANY,
        format: ['(CASE WHEN ', Config.ARG1, ' THEN ', Config.ARG2, ' ELSE ', Config.ARG3, ' END)'],
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
            DATA_TYPES.NUMERIC,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['ABS(', Config.ARG1, ')'],
    },
    'char': {
        description: 'Gets character from numerical ascii character',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            DATA_TYPES.NUMERIC,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['CHAR(', Config.ALL_ARGS, ')'],
    },
    coalesce: {
        description: 'Returns first non-null value from arguments',
        min_args: 1,
        max_args: Infinity,
        return_type: DATA_TYPES.ANY_TYPE,
        format: ['COALESCE(', Config.ALL_ARGS, ')'],
    },
    ifnull: {
        description: 'Returns first argument if not null otherwise returns second argument',
        min_args: 2,
        max_args: 2,
        return_type: DATA_TYPES.ANY_TYPE,
        format: ['IFNULL(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    instr: {
        description: 'Gets character position of argument two in argument one\'s string',
        min_args: 2,
        max_args: 2,
        return_type: DATA_TYPES.NUMERIC,
        arg_types: [
            DATA_TYPES.STRING,
            DATA_TYPES.STRING,
        ],
        format: ['INSTR(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    hex: {
        description: 'Returns hex value of argument',
        min_args: 1,
        max_args: 1,
        return_type: DATA_TYPES.STRING,
        format: ['HEX(', Config.ARG1, ')'],
    },
    length: {
        description: 'Returns the string length',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['LENGTH(', Config.ARG1, ')'],
    },
    lower: {
        description: 'Returns string converted to lower case',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['LOWER(', Config.ARG1, ')'],
    },
    ltrim: {
        description: 'Returns left-trimmed string',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['LTRIM(', Config.ARG1, ')'],
    },
    nullif: {
        description: 'Returns null if argument one equals argument two',
        min_args: 2,
        max_args: 2,
        return_type: DATA_TYPES.ANY_TYPE,
        format: ['NULLIF(', Config.ARG1, ', ', Config.ARG2, ')'],
    },
    random: {
        description: 'Returns random number (platform dependent)',
        min_args: 0,
        max_args: 0,
        return_type: DATA_TYPES.NUMERIC,
        format: ['RANDOM()'],
    },
    replace: {
        description: 'Searches for argument two and replaces matches with argument three in argument one',
        min_args: 3,
        max_args: 3,
        arg_types: [
            DATA_TYPES.STRING,
            DATA_TYPES.STRING,
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['REPLACE(', Config.ARG1, ', ', Config.ARG2, ', ', Config.ARG3, ')'],
    },
    round: {
        description: 'Returns rounded value of argument one with decimal percision of argument two',
        min_args: 1,
        max_args: 2,
        arg_types: [
            DATA_TYPES.NUMERIC,
            DATA_TYPES.NUMERIC,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['ROUND(', Config.ALL_ARGS, ')'],
    },
    rtrim: {
        description: 'Returns right-trimmed value',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['RTRIM(', Config.ARG1, ')'],
    },
    substr: {
        description: 'Returns part of argument one string from argument two position with length of argument three',
        min_args: 2,
        max_args: 3,
        arg_types: [
            DATA_TYPES.STRING,
            DATA_TYPES.NUMERIC,
            DATA_TYPES.NUMERIC,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['SUBSTR(', Config.ALL_ARGS, ')'],
    },
    trim: {
        description: 'Returns full trimmed string',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['TRIM(', Config.ARG1, ')'],
    },
    upper: {
        description: 'Returns value converted to upper case',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['UPPER(', Config.ARG1, ')'],
    },
    concat: {
        description: 'Returns multiple strings joined together',
        min_args: 1,
        max_args: Infinity,
        arg_types: [
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['CONCAT(', Config.ALL_ARGS, ')'],
    },

    /* Date Functions */
    date_format: {
        description: 'Returns date converted converted using format of argument two',
        min_args: 2,
        max_args: 2,
        arg_types: [
            DATA_TYPES.DATE,
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['DATE_FORMAT(', Config.ARG1, ', ', Config.ARG2,')'],
    },
    date: {
        description: 'Returns date porition of argument one',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.DATE,
        format: ['DATE(', Config.ARG1, ')'],
    },
    day: {
        description: 'Returns day number of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['DAY(', Config.ARG1, ')'],
    },
    from_unixtime: {
        description: 'Returns date type from unix timestamp',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.NUMERIC,
        ],
        return_type: DATA_TYPES.DATE,
        format: ['FROM_UNIXTIME(', Config.ARG1, ')'],
    },
    hour: {
        description: 'Returns hour portion of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['HOUR(', Config.ARG1, ')'],
    },
    minute: {
        description: 'Returns minute porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['MINUTE(', Config.ARG1, ')'],
    },
    month: {
        description: 'Returns month number porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['MONTH(', Config.ARG1, ')'],
    },
    now: {
        description: 'Returns current time/date',
        min_args: 0,
        max_args: 0,
        return_type: DATA_TYPES.DATE,
        format: ['NOW()'],
    },
    second: {
        description: 'Returns second porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['SECOND(', Config.ARG1, ')'],
    },
    time: {
        description: 'Returns time porition of date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.STRING,
        format: ['TIME(', Config.ARG1, ')'],
    },
    unix_timestamp: {
        description: 'Returns unix timestamp from date',
        min_args: 0,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['UNIX_TIMESTAMP(', Config.ARG1, ')'],
    },
    year: {
        description: 'Returns year porition from date',
        min_args: 1,
        max_args: 1,
        arg_types: [
            DATA_TYPES.DATE,
        ],
        return_type: DATA_TYPES.NUMERIC,
        format: ['YEAR(', Config.ARG1, ')'],
    },

    /* Aggregate functions */
    avg: {
        description: 'Returns average value',
        min_args: 1,
        max_args: 2,
        arg_types: [
            DATA_TYPES.NUMERIC,
            DATA_TYPES.BOOLEAN,
        ],
        return_type: DATA_TYPES.NUMERIC,
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
            DATA_TYPES.NUMERIC,
            DATA_TYPES.BOOLEAN,
        ],
        return_type: DATA_TYPES.NUMERIC,
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
            DATA_TYPES.STRING,
            DATA_TYPES.BOOLEAN,
            DATA_TYPES.STRING,
            DATA_TYPES.STRING,
            DATA_TYPES.STRING,
        ],
        return_type: DATA_TYPES.STRING,
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
            DATA_TYPES.NUMERIC,
            DATA_TYPES.BOOLEAN,
        ],
        return_type: DATA_TYPES.NUMERIC,
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
            DATA_TYPES.NUMERIC,
            DATA_TYPES.BOOLEAN,
        ],
        return_type: DATA_TYPES.NUMERIC,
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
            DATA_TYPES.NUMERIC,
            DATA_TYPES.BOOLEAN,
        ],
        return_type: DATA_TYPES.NUMERIC,
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
        return_type: DATA_TYPES.ANY,
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