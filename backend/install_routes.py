from pathlib import Path
from pip import main
from openapi_to_fastapi.routes import SpecRouter

specs = Path("../../../Moodle/Webprogrammierung (SoSe 23)/Projekt/Pollock.yaml")

router = SpecRouter(specs).to_fastapi_router()