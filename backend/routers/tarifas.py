from fastapi import APIRouter, HTTPException, Query
import pandas as pd
import os
from typing import Optional

router = APIRouter()


def _csv_path(destino: str, temporada: Optional[str]) -> str:
    if destino == "san-pedro":
        year = temporada if temporada in ("2026", "2027") else "2026"
        return f"data/san_pedro/tarifas_{year}.csv"
    elif destino == "villa-carlos-paz":
        return "data/vcp/tarifas_y_formas_de_pago.csv"
    raise HTTPException(status_code=404, detail="Destino no encontrado")


def _clean(val) -> int:
    if pd.isna(val) or val == "":
        return 0
    s = str(val).replace("$", "").replace(".", "").replace(",", "").replace("s", "").strip()
    try:
        return int(float(s))
    except ValueError:
        return 0


@router.get("/tarifas/{destino}")
def get_tarifas(destino: str, temporada: Optional[str] = Query(None)):
    path = _csv_path(destino, temporada)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail=f"Archivo no encontrado: {path}")

    df = pd.read_csv(path)
    df.columns = df.columns.str.strip()

    excluir = {"Programa", "Contado", "Valor del Viaje", "Costo Total", "Valor del viaje"}
    cuota_cols = [c for c in df.columns if c not in excluir]

    planes = []
    for _, row in df.iterrows():
        prog = str(row["Programa"])
        prog_lower = prog.lower()
        if "avión" in prog_lower or "avion" in prog_lower:
            icono = "✈️"
        else:
            icono = "🚌"

        planes.append({
            "programa": prog,
            "icono": icono,
            "contado": _clean(row.get("Contado", 0)),
            "cuotas": {
                col.replace("_", " "): _clean(row[col])
                for col in cuota_cols
            },
        })

    return {"destino": destino, "temporada": temporada, "planes": planes}
