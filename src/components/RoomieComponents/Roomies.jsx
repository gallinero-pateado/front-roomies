import { useState, useEffect,useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { RoomieCard } from "./RoomieCard";
import carreras from "../Const/carreras";
import Filter from "../FilterComponents/Filter"; 
import { ThemeContext } from "../../context/ThemeContext";
import themeStyles from "../Const/themes"


const apiurl = "https://api-roomies.tssw.info";

export function RoomiesList() {
  // Estado para almacenar los usuarios obtenidos de la base de datos

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const id = parseInt(Cookies.get("roomieId"));

  useEffect(() => {
    const fetchRoomies = async () => {
      try {
        //obtener todos los usuarios que tengan una id roomie
        const response = await axios.get(`${apiurl}/UsuariosconRoomie`);
        const data = response.data;

        const finalData = data
          .filter((user) => user.Usuario_Roomie.Id !== 0)
          .map((user) => ({
            ...user,
            NombreCarrera: getCarrera(user.Id_carrera),
          }));

        setUsers(finalData);
        console.log(users);
      } catch (error) {
        console.error("Error al obtener datos del perfil:", error);
      }
    };
    //obtener todos los favoritos del usuario
    const fecthFavoritos = async () => {
      try {
        const response = await axios.get(`${apiurl}/FavoritosRoomie/${id}`);
        setFavorites(response.data);
      } catch (error) {
        console.error("Error al obtener favoritos", error);
      }
    };
    fetchRoomies();
    fecthFavoritos();
  }, [id]);

  //filtrar por nombre
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.Nombres.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  //Filtro general
  const handleFilter = (filters) => {
    const { comuna, intereses, preferencias, carrera } = filters;

    setFilteredUsers(
      users.filter((user) => {
        const matchComuna = comuna
          ? user.Usuario_Roomie.Ubicacion === comuna
          : true;
        const matchIntereses = intereses.length
          ? intereses.every((interes) =>
              user.Usuario_Roomie.Intereses.split(",").includes(interes)
            )
          : true;
        const matchPreferencias = preferencias.length
          ? preferencias.every((preferencia) =>
              user.Usuario_Roomie.Preferencias.split(",").includes(preferencia)
            )
          : true;
        const matchCarrera = carrera
          ? String(user.Id_carrera) === String(carrera)
          : true;

        return (
          matchComuna && matchIntereses && matchPreferencias && matchCarrera
        );
      })
    );
  };

  //obtener el nmobre de la carrera
  const getCarrera = (Id_carrera) => {
    const data = carreras.find((c) => c.value === Id_carrera);
    return data ? data.label : "Carrera no encontrada";
  };

  return (
    <section className="flex p-4 gap-4">
      <div className="w-1/4">
        {/*Barra de busqueda*/}
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${styles.inputBg} ${styles.inputText} mb-4 rounded py-2 px-2`}
        />

        {/*filtro*/}
        <Filter onFilter={handleFilter} />
      </div>

      <div className="w-3/4">
        {/*Lista de usuarios*/}

        {filteredUsers.map((user) => (
          <div className="mb-4">
            {user.Id !== id ? (
              <RoomieCard
                key={user.Id}
                ID={user.Id}
                Roomie={user.Usuario_Roomie.Id}
                Correo={user.Correo}
                Nombres={user.Nombres}
                Apellidos={user.Apellidos}
                Id_carrera={user.NombreCarrera}
                Ano_Ingreso={user.Ano_Ingreso}
                Foto_perfil={user.Foto_Perfil
                }
                Genero={user.Usuario_Roomie.Genero}
                Biografia={user.Usuario_Roomie.Biografia}
                Intereses={user.Usuario_Roomie.Intereses.split(",").map(
                  (interes) => interes.trim()
                )}
                Preferencias={user.Usuario_Roomie.Preferencias.split(",").map(
                  (interes) => interes.trim()
                )}
                Ubicacion={user.Usuario_Roomie.Ubicacion}
                favoritos={favorites}
                FotoPerfil = {user.Foto_perfil}
              />
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export default RoomiesList;
