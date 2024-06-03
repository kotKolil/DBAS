#importing external classes
from sqlalchemy.orm import *
from sqlalchemy import *

#importing classes
from settings import *

#creating DB engine
match TypeOfDb:

    case "sqlite3":

        SQLALCHEMY_DATABASE_URL = f"sqlite:///./{DBName}"

        engine = create_engine(
            SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
        )


    case "postgres":

        engine = create_engine(f"postgresql:///?User={DBUserName}&Password={DBPassword}&Database={DBName}&Server={DBHost}&Port={DBPort}")

    
    case _:
        raise TypeError("Unknown DB type")


class Base(DeclarativeBase):
    pass


class Human(Base):
    __tablename__ = "Human"
 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer,)

class Car(Base):

    __tablename__ = "Car"

    id = Column(Integer, primary_key=True, index=True)
    NmameOfModel = Column(String)
    Power = Column(Integer,)
    Owner = mapped_column(ForeignKey("Human.id"))
 
if __name__ == "__main__":
    #creating all
    Base.metadata.create_all(bind=engine)
else:
    Session = sessionmaker(autoflush=False, bind=engine)
    