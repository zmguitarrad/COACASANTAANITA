---------------------CONSULTAR MES ACTUAL------------------------------
select date_part('month',date_trunc('MONTH',now())::DATE)

-----------------------------------------------------------------------
<h5>  Perspectiva:  </h5> &nbsp;  &nbsp; 

-----------------------------ACTIVIDAD PRINCIPAL----------------------------------------------------------------------------------------
static getActividadPrincipal = async (req: Request, res: Response) => {
        try {
          const ActividadDB = getRepository(proceso_actividad);
          const { secuencial } = res.locals.jwtPayload;
          const poa = req.params.poa;
          const response = await ActividadDB.query(
            `select
            actividades.secuencial,actividades.nombre_actividad, actividades.nombre_objetivo_perspectiva, 
            actividades.nombre_rol, actividades.entregables,actividades.personal_apoyo, coalesce(avance.avance,0) avance
            from 
            (
            select   pac.secuencial,obj.nombre_objetivo_perspectiva, ro.nombre_rol ,per.secuencial secperspectiva ,pma.secuencial secuecialpoa ,pac.secuencial actividad_sec ,pac.nombre_actividad,
            pma.nombre_poa_maestro,pac.personal_apoyo,pac.entregables
            , us.secuencial usuarios
            from proceso_perspectiva per
            inner join proceso_objetivo_perspectiva obj on per.secuencial = obj.secuencial_perspectiva
            inner join indicadores_indicador ind on obj.secuencial = ind.secuencial_objetivo_perspectiva
            inner join proceso_actividad pac on pac.secuencial_indicador=ind.secuencial
            inner join mando_integral_poa_maestro pma on pma.secuencial=pac.secuencial_poa_maestro
            inner join seguridades_role ro on ro.secuencial= pac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            ) actividades
                
            LEFT JOIN (
            
            select deno.secuencial_poa_maestro, deno.secu_us ,deno.actividad , deno.denomina,numer.num , ROUND( coalesce( numer.num / deno.denomina , 0)*100 ,2) avance
            
            from (
            select poac.secuencial_poa_maestro, us.secuencial secu_us ,pma.nombre_poa_maestro, ac.secuencial actividad,ac.nombre_actividad , CAST (count(*) AS numeric(6,2)) denomina
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial=poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            where poac.secuencial_estado<>4
            group by poac.secuencial_poa_maestro,ac.secuencial,pma.nombre_poa_maestro, ac.nombre_Actividad, us.secuencial
            )deno
            
            left join (
            select poac.secuencial_poa_maestro secpm, us.secuencial usuario ,pma.nombre_poa_maestro ,ac.secuencial secac,ac.nombre_actividad , CAST( count(*) AS  numeric(6,2))  num  
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial = poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            WHERE poac.secuencial_estado=2
            group by poac.secuencial_poa_maestro,ac.secuencial, pma.nombre_poa_maestro, ac.nombre_actividad, us.secuencial
            )numer  on numer.secpm =deno.secuencial_poa_maestro and numer.secac=deno.actividad
            and numer.usuario=deno.secu_us
            ) avance on avance.secuencial_poa_maestro=actividades.secuecialpoa and
            avance.secu_us=actividades.usuarios and  avance.actividad =actividades.actividad_sec
            
            where actividades.usuarios=$1 and actividades.secuecialpoa=$2 `,
            [secuencial,poa]
          );
          return res.json(response);
        } catch (error) {
          res.json({ error }).status(209);
        }
      };
	  
	  
--------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------ACTIVIDAD BY PERSPECTIVA--------------------------------------------------------------------------------------------

static getActividadByPerspectiva = async (req: Request, res: Response) => {
        try {
          const ActividadDB = getRepository(proceso_perspectiva);
          const { secuencial } = res.locals.jwtPayload;
          const poa = req.params.poa;
          const perspectiva =req.params.perspectiva;
          const response = await ActividadDB.query(
            `select
            actividades.secuencial as "secuencial_perspectiva",actividades.nombre_perspectiva,actividades.secuencial,actividades.nombre_actividad, actividades.nombre_objetivo_perspectiva, 
            actividades.nombre_rol, actividades.entregables,actividades.personal_apoyo, coalesce(avance.avance,0) avance
            from 
            (
            select  per.secuencial as "secuencial_perspectiva",per.nombre_perspectiva, pac.secuencial,obj.nombre_objetivo_perspectiva, ro.nombre_rol ,per.secuencial secperspectiva ,pma.secuencial secuecialpoa ,pac.secuencial actividad_sec ,pac.nombre_actividad,
            pma.nombre_poa_maestro,pac.personal_apoyo,pac.entregables
            , us.secuencial usuarios
            from proceso_perspectiva per
            inner join proceso_objetivo_perspectiva obj on per.secuencial = obj.secuencial_perspectiva
            inner join indicadores_indicador ind on obj.secuencial = ind.secuencial_objetivo_perspectiva
            inner join proceso_actividad pac on pac.secuencial_indicador=ind.secuencial
            inner join mando_integral_poa_maestro pma on pma.secuencial=pac.secuencial_poa_maestro
            inner join seguridades_role ro on ro.secuencial= pac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            ) actividades
                
            LEFT JOIN (
            
            select deno.secuencial_poa_maestro, deno.secu_us ,deno.actividad , deno.denomina,numer.num , ROUND( coalesce( numer.num / deno.denomina , 0)*100 ,2) avance
            
            from (
            select poac.secuencial_poa_maestro, us.secuencial secu_us ,pma.nombre_poa_maestro, ac.secuencial actividad,ac.nombre_actividad , CAST (count(*) AS numeric(6,2)) denomina
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial=poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            group by poac.secuencial_poa_maestro,ac.secuencial,pma.nombre_poa_maestro, ac.nombre_Actividad, us.secuencial
            )deno
            
            left join (
            select poac.secuencial_poa_maestro secpm, us.secuencial usuario ,pma.nombre_poa_maestro ,ac.secuencial secac,ac.nombre_actividad , CAST( count(*) AS  numeric(6,2))  num  
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial = poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            WHERE poac.secuencial_estado=2
            group by poac.secuencial_poa_maestro,ac.secuencial, pma.nombre_poa_maestro, ac.nombre_actividad, us.secuencial
            )numer  on numer.secpm =deno.secuencial_poa_maestro and numer.secac=deno.actividad
            and numer.usuario=deno.secu_us
            ) avance on avance.secuencial_poa_maestro=actividades.secuecialpoa and
            avance.secu_us=actividades.usuarios and  avance.actividad =actividades.actividad_sec
            
            where actividades.usuarios=$1 AND actividades.secperspectiva=$2 and actividades.secuecialpoa=$3	`,
            [secuencial,perspectiva,poa]
          );
          return res.json(response);
        } catch (error) {
          res.json({ error }).status(209);
        }
      };