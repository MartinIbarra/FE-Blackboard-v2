import { useRef, useEffect } from "react";
import { socket } from "../../socket";
import {
  CoordenadasTypes,
  DibujandoSocketTypes,
  BorradorTypes,
} from "../../types/socket.types";
import { useLocation } from "react-router-dom";
// import { useParams } from "react-dom";
// import ColorPalette from "./ColorPalette";
// import { UserContext } from "../../UserContext";

const Blackboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const borradorRef = useRef(null) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const penRef = useRef(null) as any;
  // const [color, setColor] = useState("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useLocation();

  console.log("state =>", state);
  // const { user, setUser } = useContext(UserContext);
  // let { room_id, room_name } = useParams();

  // const getColor = (param) => {
  //   setColor(param);
  // };

  useEffect(() => {
    const canv = canvasRef.current;
    const ctx = canv?.getContext("2d");
    let dibujando = false;
    let borrando = false;
    let pen = true;
    let borrador = false;

    const coordenadas: CoordenadasTypes = {
      x: 0,
      y: 0,
    };

    const oldCoord: CoordenadasTypes = {
      x: 0,
      y: 0,
    };

    const obtenerPosicion = (e: MouseEvent) => {
      const rect: DOMRect | undefined = canv?.getBoundingClientRect();
      if (rect) {
        coordenadas.x = e.clientX - rect.left;
        coordenadas.y = e.clientY - rect.top;
      }
      return coordenadas;
    };

    const borrar = (e: MouseEvent) => {
      const pos = obtenerPosicion(e);
      socket.emit("borrando", { pos, room_id: state.room });
      ctx?.clearRect(pos.x - 50, pos.y - 50, 100, 100);
    };

    const borrandoSocket = (data: { pos: CoordenadasTypes }) => {
      ctx?.clearRect(data.pos.x - 50, data.pos.y - 50, 100, 100);
    };

    const dibujandoSocket = (data: DibujandoSocketTypes) => {
      if (ctx) {
        console.log("dibujandosocket => ", data);
        ctx?.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = !data.color ? "#000000" : data.color;
        ctx.moveTo(data.oldCoord.x, data.oldCoord.y);
        ctx.lineTo(data.coordenadas.x, data.coordenadas.y);
        ctx.stroke();
      }
    };

    const dibujar = (event: MouseEvent) => {
      if (
        ctx !== null &&
        ctx !== undefined &&
        canv !== null &&
        canv !== undefined
      ) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000000"; // !color ? "#000000" : color;
        ctx.moveTo(coordenadas.x, coordenadas.y);

        oldCoord.x = coordenadas.x;
        oldCoord.y = coordenadas.y;

        obtenerPosicion(event);
        // console.log("state en dibujandoSocket => ", state);
        socket.emit("dibujandoSocket", {
          origin: state.socket_name,
          oldCoord,
          coordenadas,
          room: state.room,
          color: "#000000",
        });

        ctx.lineTo(coordenadas.x, coordenadas.y);
        ctx.stroke();
      }
    };

    if (
      ctx !== null &&
      ctx !== undefined &&
      canv !== null &&
      canv !== undefined
    ) {
      // socket.emit("join", {
      //   name: state.name,
      //   room_id: state.roomID,
      //   user_id: user._id,
      //   room_name,
      // });
      ctx.lineWidth = 1;

      if (
        borradorRef &&
        borradorRef.current !== null &&
        penRef &&
        penRef.current !== null
      ) {
        borradorRef.current.addEventListener(
          "click",
          () => {
            borrador = true;
            pen = false;
          },
          false
        );

        penRef.current.addEventListener(
          "click",
          () => {
            borrador = false;
            pen = true;
          },
          false
        );
      }

      canv.addEventListener("mousedown", (event: MouseEvent) => {
        if (pen) {
          dibujando = true;
        } else if (borrador) {
          borrando = true;
        }
        obtenerPosicion(event);
      });

      canv.addEventListener("mouseup", () => {
        borrando = false;
        dibujando = false;
      });

      canv.addEventListener(
        "mousemove",
        (e: MouseEvent) => {
          if (pen && dibujando) {
            dibujar(e);
          } else if (borrador && borrando) {
            borrar(e);
          }
        },
        false
      );
      socket.on("dibujandoSocket", (data: DibujandoSocketTypes) => {
        // console.log("data => ", data);
        dibujandoSocket(data);
      });

      socket.on("borrando", (data: BorradorTypes) => {
        borrandoSocket(data);
      });

      // socket.on("changeColor", (data: string) => setColor(data));
    } else {
      throw new Error("Could not get context");
    }

    return () => {
      socket.off("borrando");
      socket.off("dibujandoSocket");
      socket.off("joinRoom");
    };
  }, []);
  return (
    <div className="max-w-fit m-auto">
      {/* <ColorPalette getColor={getColor} user={socket} /> */}
      <span id="borrador" ref={borradorRef}></span>
      <span id="pen" ref={penRef}></span>
      <canvas
        id="canvas"
        width="800"
        height="600"
        className="bg-white"
        ref={canvasRef}
      >
        Tu navegador no es compatible
      </canvas>
    </div>
  );
};

export default Blackboard;
