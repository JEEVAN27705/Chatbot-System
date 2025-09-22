from models.fee_model import Fee, SessionLocal

session = SessionLocal()
fees = session.query(Fee).all()
print("📌 Fee Records in DB:")
for f in fees:
    print(f"Caste={f.caste}, Amount={f.amount}, Lang={f.lang}")
session.close()
