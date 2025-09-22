from models.fee_model import Fee, SessionLocal, init_db

# Reset DB schema
init_db()

# Add English-only fee records
fees_data = [
    {"caste": "general", "amount": "₹7000"},
    {"caste": "obc", "amount": "₹5000"},
    {"caste": "sc", "amount": "₹2000"},
    {"caste": "st", "amount": "₹1000"},
]

session = SessionLocal()
session.query(Fee).delete()  # clear old data
for f in fees_data:
    fee = Fee(caste=f["caste"], lang="en", amount=f["amount"])
    session.add(fee)

session.commit()
session.close()

print("✅ Database seeded with English-only fees.")
    