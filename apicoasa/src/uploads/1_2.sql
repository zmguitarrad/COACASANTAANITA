PGDMP     0        
            y            coacsa     13.4 (Ubuntu 13.4-1.pgdg20.04+1)    13.3 ?    h           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            i           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            j           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            k           1262    414474    coacsa    DATABASE     c   CREATE DATABASE coacsa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE coacsa;
                postgres    false            l           0    0    DATABASE coacsa    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE coacsa FROM PUBLIC;
                   postgres    false    4203            m           0    0    SCHEMA public    ACL     ?   REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    5            n           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO postgres;
                   postgres    false    738            ?            1259    4520303    auditoria_bitacora    TABLE     i  CREATE TABLE public.auditoria_bitacora (
    secuencial integer NOT NULL,
    fecha_evento timestamp without time zone NOT NULL,
    nombre_clase character varying NOT NULL,
    nombre_metodo character varying NOT NULL,
    descripcion_evento character varying NOT NULL,
    id_usuario character varying NOT NULL,
    direccion_ip character varying NOT NULL
);
 &   DROP TABLE public.auditoria_bitacora;
       public         heap    postgres    false            ?            1259    4520301 !   auditoria_bitacora_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.auditoria_bitacora_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auditoria_bitacora_secuencial_seq;
       public          postgres    false    215            o           0    0 !   auditoria_bitacora_secuencial_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auditoria_bitacora_secuencial_seq OWNED BY public.auditoria_bitacora.secuencial;
          public          postgres    false    214            ?            1259    4520152    generales_anio    TABLE     c   CREATE TABLE public.generales_anio (
    secuencial integer NOT NULL,
    anio integer NOT NULL
);
 "   DROP TABLE public.generales_anio;
       public         heap    postgres    false            ?            1259    4520150    generales_anio_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.generales_anio_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.generales_anio_secuencial_seq;
       public          postgres    false    203            p           0    0    generales_anio_secuencial_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.generales_anio_secuencial_seq OWNED BY public.generales_anio.secuencial;
          public          postgres    false    202            ?            1259    4520141    generales_calendario    TABLE     ?   CREATE TABLE public.generales_calendario (
    secuencial integer NOT NULL,
    mes character varying NOT NULL,
    secuencial_anio integer
);
 (   DROP TABLE public.generales_calendario;
       public         heap    postgres    false            ?            1259    4520139 #   generales_calendario_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.generales_calendario_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.generales_calendario_secuencial_seq;
       public          postgres    false    201            q           0    0 #   generales_calendario_secuencial_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.generales_calendario_secuencial_seq OWNED BY public.generales_calendario.secuencial;
          public          postgres    false    200            ?            1259    4710393    generales_estado    TABLE     x   CREATE TABLE public.generales_estado (
    secuencial integer NOT NULL,
    nombre_estado character varying NOT NULL
);
 $   DROP TABLE public.generales_estado;
       public         heap    postgres    false            ?            1259    4710391    generales_estado_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.generales_estado_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.generales_estado_secuencial_seq;
       public          postgres    false    227            r           0    0    generales_estado_secuencial_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.generales_estado_secuencial_seq OWNED BY public.generales_estado.secuencial;
          public          postgres    false    226            ?            1259    4520460    indicadores_indicador    TABLE     ?   CREATE TABLE public.indicadores_indicador (
    secuencial integer NOT NULL,
    nombre_indicador character varying NOT NULL,
    secuencial_objetivo_perspectiva integer
);
 )   DROP TABLE public.indicadores_indicador;
       public         heap    postgres    false            ?            1259    4520458 $   indicadores_indicador_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.indicadores_indicador_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.indicadores_indicador_secuencial_seq;
       public          postgres    false    217            s           0    0 $   indicadores_indicador_secuencial_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.indicadores_indicador_secuencial_seq OWNED BY public.indicadores_indicador.secuencial;
          public          postgres    false    216            ?            1259    4520244    mando_integral_plan_estrategico    TABLE     ?   CREATE TABLE public.mando_integral_plan_estrategico (
    secuencial integer NOT NULL,
    nombre_plan_estrategico character varying NOT NULL,
    anio_inicio integer NOT NULL,
    anio_fin integer NOT NULL
);
 3   DROP TABLE public.mando_integral_plan_estrategico;
       public         heap    postgres    false            ?            1259    4520242 .   mando_integral_plan_estrategico_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.mando_integral_plan_estrategico_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public.mando_integral_plan_estrategico_secuencial_seq;
       public          postgres    false    209            t           0    0 .   mando_integral_plan_estrategico_secuencial_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.mando_integral_plan_estrategico_secuencial_seq OWNED BY public.mando_integral_plan_estrategico.secuencial;
          public          postgres    false    208            ?            1259    4879797    mando_integral_poa_actividad    TABLE     [  CREATE TABLE public.mando_integral_poa_actividad (
    secuencial integer NOT NULL,
    presupuesto numeric(6,2) NOT NULL,
    presupuesto_utilizado numeric(6,2) NOT NULL,
    secuencial_postergacion integer,
    secuencial_poa_maestro integer,
    secuencial_actividad integer,
    secuencial_estado integer,
    secuencial_calendario integer
);
 0   DROP TABLE public.mando_integral_poa_actividad;
       public         heap    postgres    false            ?            1259    4823779 (   mando_integral_poa_actividad_presupuesto    TABLE     ?   CREATE TABLE public.mando_integral_poa_actividad_presupuesto (
    secuencial integer NOT NULL,
    presupuesto numeric(6,2) NOT NULL,
    secuencial_poa_maestro integer,
    secuencial_actividad integer
);
 <   DROP TABLE public.mando_integral_poa_actividad_presupuesto;
       public         heap    postgres    false            ?            1259    4823777 7   mando_integral_poa_actividad_presupuesto_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.mando_integral_poa_actividad_presupuesto_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 N   DROP SEQUENCE public.mando_integral_poa_actividad_presupuesto_secuencial_seq;
       public          postgres    false    229            u           0    0 7   mando_integral_poa_actividad_presupuesto_secuencial_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.mando_integral_poa_actividad_presupuesto_secuencial_seq OWNED BY public.mando_integral_poa_actividad_presupuesto.secuencial;
          public          postgres    false    228            ?            1259    4879795 +   mando_integral_poa_actividad_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.mando_integral_poa_actividad_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public.mando_integral_poa_actividad_secuencial_seq;
       public          postgres    false    233            v           0    0 +   mando_integral_poa_actividad_secuencial_seq    SEQUENCE OWNED BY     {   ALTER SEQUENCE public.mando_integral_poa_actividad_secuencial_seq OWNED BY public.mando_integral_poa_actividad.secuencial;
          public          postgres    false    232            ?            1259    4558127    mando_integral_poa_maestro    TABLE     ?   CREATE TABLE public.mando_integral_poa_maestro (
    secuencial integer NOT NULL,
    nombre_poa_maestro character varying NOT NULL,
    activo boolean NOT NULL,
    secuencial_plan_estrategico integer,
    secuencial_anio integer
);
 .   DROP TABLE public.mando_integral_poa_maestro;
       public         heap    postgres    false            ?            1259    4558125 )   mando_integral_poa_maestro_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.mando_integral_poa_maestro_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE public.mando_integral_poa_maestro_secuencial_seq;
       public          postgres    false    219            w           0    0 )   mando_integral_poa_maestro_secuencial_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public.mando_integral_poa_maestro_secuencial_seq OWNED BY public.mando_integral_poa_maestro.secuencial;
          public          postgres    false    218            ?            1259    4520257 '   mando_integral_usuario_plan_estrategico    TABLE     ?   CREATE TABLE public.mando_integral_usuario_plan_estrategico (
    secuencial integer NOT NULL,
    secuencial_plan_estrategico integer,
    secuencial_usuario character varying,
    activo boolean NOT NULL
);
 ;   DROP TABLE public.mando_integral_usuario_plan_estrategico;
       public         heap    postgres    false            ?            1259    4520255 6   mando_integral_usuario_plan_estrategico_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.mando_integral_usuario_plan_estrategico_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 M   DROP SEQUENCE public.mando_integral_usuario_plan_estrategico_secuencial_seq;
       public          postgres    false    211            x           0    0 6   mando_integral_usuario_plan_estrategico_secuencial_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.mando_integral_usuario_plan_estrategico_secuencial_seq OWNED BY public.mando_integral_usuario_plan_estrategico.secuencial;
          public          postgres    false    210            ?            1259    4600168    proceso_actividad    TABLE     :  CREATE TABLE public.proceso_actividad (
    secuencial integer NOT NULL,
    nombre_actividad character varying NOT NULL,
    personal_apoyo character varying NOT NULL,
    entregables character varying NOT NULL,
    secuencial_indicador integer,
    secuencial_role integer,
    secuencial_poa_maestro integer
);
 %   DROP TABLE public.proceso_actividad;
       public         heap    postgres    false            ?            1259    4600166     proceso_actividad_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.proceso_actividad_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.proceso_actividad_secuencial_seq;
       public          postgres    false    225            y           0    0     proceso_actividad_secuencial_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.proceso_actividad_secuencial_seq OWNED BY public.proceso_actividad.secuencial;
          public          postgres    false    224            ?            1259    4520220    proceso_objetivo_perspectiva    TABLE     ?   CREATE TABLE public.proceso_objetivo_perspectiva (
    secuencial integer NOT NULL,
    nombre_objetivo_perspectiva character varying NOT NULL,
    secuencial_perspectiva integer
);
 0   DROP TABLE public.proceso_objetivo_perspectiva;
       public         heap    postgres    false            ?            1259    4520218 +   proceso_objetivo_perspectiva_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.proceso_objetivo_perspectiva_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public.proceso_objetivo_perspectiva_secuencial_seq;
       public          postgres    false    205            z           0    0 +   proceso_objetivo_perspectiva_secuencial_seq    SEQUENCE OWNED BY     {   ALTER SEQUENCE public.proceso_objetivo_perspectiva_secuencial_seq OWNED BY public.proceso_objetivo_perspectiva.secuencial;
          public          postgres    false    204            ?            1259    4879786    proceso_observacion    TABLE     ?   CREATE TABLE public.proceso_observacion (
    secuencial integer NOT NULL,
    nombre_observacion character varying NOT NULL,
    fecha timestamp without time zone NOT NULL,
    entregables character varying,
    secuencial_poa_actividad integer
);
 '   DROP TABLE public.proceso_observacion;
       public         heap    postgres    false            ?            1259    4879784 "   proceso_observacion_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.proceso_observacion_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.proceso_observacion_secuencial_seq;
       public          postgres    false    231            {           0    0 "   proceso_observacion_secuencial_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.proceso_observacion_secuencial_seq OWNED BY public.proceso_observacion.secuencial;
          public          postgres    false    230            ?            1259    4520233    proceso_perspectiva    TABLE     ?   CREATE TABLE public.proceso_perspectiva (
    secuencial integer NOT NULL,
    nombre_perspectiva character varying NOT NULL,
    secuencial_plan_estrategico integer
);
 '   DROP TABLE public.proceso_perspectiva;
       public         heap    postgres    false            ?            1259    4520231 "   proceso_perspectiva_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.proceso_perspectiva_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.proceso_perspectiva_secuencial_seq;
       public          postgres    false    207            |           0    0 "   proceso_perspectiva_secuencial_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.proceso_perspectiva_secuencial_seq OWNED BY public.proceso_perspectiva.secuencial;
          public          postgres    false    206            ?            1259    4593002    seguridades_role    TABLE     ?   CREATE TABLE public.seguridades_role (
    secuencial integer NOT NULL,
    nombre_rol character varying NOT NULL,
    activo boolean NOT NULL
);
 $   DROP TABLE public.seguridades_role;
       public         heap    postgres    false            ?            1259    4593000    seguridades_role_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.seguridades_role_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.seguridades_role_secuencial_seq;
       public          postgres    false    223            }           0    0    seguridades_role_secuencial_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.seguridades_role_secuencial_seq OWNED BY public.seguridades_role.secuencial;
          public          postgres    false    222            ?            1259    4520268    seguridades_usuario    TABLE     S  CREATE TABLE public.seguridades_usuario (
    id integer NOT NULL,
    secuencial character varying NOT NULL,
    cedula character varying NOT NULL,
    nombres character varying NOT NULL,
    apellidos character varying NOT NULL,
    correo character varying NOT NULL,
    clave character varying NOT NULL,
    activo boolean NOT NULL
);
 '   DROP TABLE public.seguridades_usuario;
       public         heap    postgres    false            ?            1259    4520266    seguridades_usuario_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.seguridades_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.seguridades_usuario_id_seq;
       public          postgres    false    213            ~           0    0    seguridades_usuario_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.seguridades_usuario_id_seq OWNED BY public.seguridades_usuario.id;
          public          postgres    false    212            ?            1259    4592991    seguridades_usuario_role    TABLE     ?   CREATE TABLE public.seguridades_usuario_role (
    secuencial integer NOT NULL,
    activo boolean NOT NULL,
    secuencial_usuario character varying,
    secuencial_role integer
);
 ,   DROP TABLE public.seguridades_usuario_role;
       public         heap    postgres    false            ?            1259    4592989 '   seguridades_usuario_role_secuencial_seq    SEQUENCE     ?   CREATE SEQUENCE public.seguridades_usuario_role_secuencial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.seguridades_usuario_role_secuencial_seq;
       public          postgres    false    221                       0    0 '   seguridades_usuario_role_secuencial_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.seguridades_usuario_role_secuencial_seq OWNED BY public.seguridades_usuario_role.secuencial;
          public          postgres    false    220            r           2604    4520306    auditoria_bitacora secuencial    DEFAULT     ?   ALTER TABLE ONLY public.auditoria_bitacora ALTER COLUMN secuencial SET DEFAULT nextval('public.auditoria_bitacora_secuencial_seq'::regclass);
 L   ALTER TABLE public.auditoria_bitacora ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    215    214    215            l           2604    4520155    generales_anio secuencial    DEFAULT     ?   ALTER TABLE ONLY public.generales_anio ALTER COLUMN secuencial SET DEFAULT nextval('public.generales_anio_secuencial_seq'::regclass);
 H   ALTER TABLE public.generales_anio ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    202    203    203            k           2604    4520144    generales_calendario secuencial    DEFAULT     ?   ALTER TABLE ONLY public.generales_calendario ALTER COLUMN secuencial SET DEFAULT nextval('public.generales_calendario_secuencial_seq'::regclass);
 N   ALTER TABLE public.generales_calendario ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    200    201    201            x           2604    4710396    generales_estado secuencial    DEFAULT     ?   ALTER TABLE ONLY public.generales_estado ALTER COLUMN secuencial SET DEFAULT nextval('public.generales_estado_secuencial_seq'::regclass);
 J   ALTER TABLE public.generales_estado ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    227    226    227            s           2604    4520463     indicadores_indicador secuencial    DEFAULT     ?   ALTER TABLE ONLY public.indicadores_indicador ALTER COLUMN secuencial SET DEFAULT nextval('public.indicadores_indicador_secuencial_seq'::regclass);
 O   ALTER TABLE public.indicadores_indicador ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    217    216    217            o           2604    4520247 *   mando_integral_plan_estrategico secuencial    DEFAULT     ?   ALTER TABLE ONLY public.mando_integral_plan_estrategico ALTER COLUMN secuencial SET DEFAULT nextval('public.mando_integral_plan_estrategico_secuencial_seq'::regclass);
 Y   ALTER TABLE public.mando_integral_plan_estrategico ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    208    209    209            {           2604    4879800 '   mando_integral_poa_actividad secuencial    DEFAULT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad ALTER COLUMN secuencial SET DEFAULT nextval('public.mando_integral_poa_actividad_secuencial_seq'::regclass);
 V   ALTER TABLE public.mando_integral_poa_actividad ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    232    233    233            y           2604    4823782 3   mando_integral_poa_actividad_presupuesto secuencial    DEFAULT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad_presupuesto ALTER COLUMN secuencial SET DEFAULT nextval('public.mando_integral_poa_actividad_presupuesto_secuencial_seq'::regclass);
 b   ALTER TABLE public.mando_integral_poa_actividad_presupuesto ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    229    228    229            t           2604    4558130 %   mando_integral_poa_maestro secuencial    DEFAULT     ?   ALTER TABLE ONLY public.mando_integral_poa_maestro ALTER COLUMN secuencial SET DEFAULT nextval('public.mando_integral_poa_maestro_secuencial_seq'::regclass);
 T   ALTER TABLE public.mando_integral_poa_maestro ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    218    219    219            p           2604    4520260 2   mando_integral_usuario_plan_estrategico secuencial    DEFAULT     ?   ALTER TABLE ONLY public.mando_integral_usuario_plan_estrategico ALTER COLUMN secuencial SET DEFAULT nextval('public.mando_integral_usuario_plan_estrategico_secuencial_seq'::regclass);
 a   ALTER TABLE public.mando_integral_usuario_plan_estrategico ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    211    210    211            w           2604    4600171    proceso_actividad secuencial    DEFAULT     ?   ALTER TABLE ONLY public.proceso_actividad ALTER COLUMN secuencial SET DEFAULT nextval('public.proceso_actividad_secuencial_seq'::regclass);
 K   ALTER TABLE public.proceso_actividad ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    225    224    225            m           2604    4520223 '   proceso_objetivo_perspectiva secuencial    DEFAULT     ?   ALTER TABLE ONLY public.proceso_objetivo_perspectiva ALTER COLUMN secuencial SET DEFAULT nextval('public.proceso_objetivo_perspectiva_secuencial_seq'::regclass);
 V   ALTER TABLE public.proceso_objetivo_perspectiva ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    205    204    205            z           2604    4879789    proceso_observacion secuencial    DEFAULT     ?   ALTER TABLE ONLY public.proceso_observacion ALTER COLUMN secuencial SET DEFAULT nextval('public.proceso_observacion_secuencial_seq'::regclass);
 M   ALTER TABLE public.proceso_observacion ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    231    230    231            n           2604    4520236    proceso_perspectiva secuencial    DEFAULT     ?   ALTER TABLE ONLY public.proceso_perspectiva ALTER COLUMN secuencial SET DEFAULT nextval('public.proceso_perspectiva_secuencial_seq'::regclass);
 M   ALTER TABLE public.proceso_perspectiva ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    206    207    207            v           2604    4593005    seguridades_role secuencial    DEFAULT     ?   ALTER TABLE ONLY public.seguridades_role ALTER COLUMN secuencial SET DEFAULT nextval('public.seguridades_role_secuencial_seq'::regclass);
 J   ALTER TABLE public.seguridades_role ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    223    222    223            q           2604    4520271    seguridades_usuario id    DEFAULT     ?   ALTER TABLE ONLY public.seguridades_usuario ALTER COLUMN id SET DEFAULT nextval('public.seguridades_usuario_id_seq'::regclass);
 E   ALTER TABLE public.seguridades_usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212    213            u           2604    4592994 #   seguridades_usuario_role secuencial    DEFAULT     ?   ALTER TABLE ONLY public.seguridades_usuario_role ALTER COLUMN secuencial SET DEFAULT nextval('public.seguridades_usuario_role_secuencial_seq'::regclass);
 R   ALTER TABLE public.seguridades_usuario_role ALTER COLUMN secuencial DROP DEFAULT;
       public          postgres    false    221    220    221            S          0    4520303    auditoria_bitacora 
   TABLE DATA           ?   COPY public.auditoria_bitacora (secuencial, fecha_evento, nombre_clase, nombre_metodo, descripcion_evento, id_usuario, direccion_ip) FROM stdin;
    public          postgres    false    215   ??       G          0    4520152    generales_anio 
   TABLE DATA           :   COPY public.generales_anio (secuencial, anio) FROM stdin;
    public          postgres    false    203   ??       E          0    4520141    generales_calendario 
   TABLE DATA           P   COPY public.generales_calendario (secuencial, mes, secuencial_anio) FROM stdin;
    public          postgres    false    201   ??       _          0    4710393    generales_estado 
   TABLE DATA           E   COPY public.generales_estado (secuencial, nombre_estado) FROM stdin;
    public          postgres    false    227   6?       U          0    4520460    indicadores_indicador 
   TABLE DATA           n   COPY public.indicadores_indicador (secuencial, nombre_indicador, secuencial_objetivo_perspectiva) FROM stdin;
    public          postgres    false    217   ??       M          0    4520244    mando_integral_plan_estrategico 
   TABLE DATA           u   COPY public.mando_integral_plan_estrategico (secuencial, nombre_plan_estrategico, anio_inicio, anio_fin) FROM stdin;
    public          postgres    false    209   8?       e          0    4879797    mando_integral_poa_actividad 
   TABLE DATA           ?   COPY public.mando_integral_poa_actividad (secuencial, presupuesto, presupuesto_utilizado, secuencial_postergacion, secuencial_poa_maestro, secuencial_actividad, secuencial_estado, secuencial_calendario) FROM stdin;
    public          postgres    false    233   ??       a          0    4823779 (   mando_integral_poa_actividad_presupuesto 
   TABLE DATA           ?   COPY public.mando_integral_poa_actividad_presupuesto (secuencial, presupuesto, secuencial_poa_maestro, secuencial_actividad) FROM stdin;
    public          postgres    false    229   0?       W          0    4558127    mando_integral_poa_maestro 
   TABLE DATA           ?   COPY public.mando_integral_poa_maestro (secuencial, nombre_poa_maestro, activo, secuencial_plan_estrategico, secuencial_anio) FROM stdin;
    public          postgres    false    219   h?       O          0    4520257 '   mando_integral_usuario_plan_estrategico 
   TABLE DATA           ?   COPY public.mando_integral_usuario_plan_estrategico (secuencial, secuencial_plan_estrategico, secuencial_usuario, activo) FROM stdin;
    public          postgres    false    211   ??       ]          0    4600168    proceso_actividad 
   TABLE DATA           ?   COPY public.proceso_actividad (secuencial, nombre_actividad, personal_apoyo, entregables, secuencial_indicador, secuencial_role, secuencial_poa_maestro) FROM stdin;
    public          postgres    false    225   ?       I          0    4520220    proceso_objetivo_perspectiva 
   TABLE DATA           w   COPY public.proceso_objetivo_perspectiva (secuencial, nombre_objetivo_perspectiva, secuencial_perspectiva) FROM stdin;
    public          postgres    false    205   ??       c          0    4879786    proceso_observacion 
   TABLE DATA           {   COPY public.proceso_observacion (secuencial, nombre_observacion, fecha, entregables, secuencial_poa_actividad) FROM stdin;
    public          postgres    false    231   Q?       K          0    4520233    proceso_perspectiva 
   TABLE DATA           j   COPY public.proceso_perspectiva (secuencial, nombre_perspectiva, secuencial_plan_estrategico) FROM stdin;
    public          postgres    false    207   ??       [          0    4593002    seguridades_role 
   TABLE DATA           J   COPY public.seguridades_role (secuencial, nombre_rol, activo) FROM stdin;
    public          postgres    false    223   I?       Q          0    4520268    seguridades_usuario 
   TABLE DATA           p   COPY public.seguridades_usuario (id, secuencial, cedula, nombres, apellidos, correo, clave, activo) FROM stdin;
    public          postgres    false    213   ??       Y          0    4592991    seguridades_usuario_role 
   TABLE DATA           k   COPY public.seguridades_usuario_role (secuencial, activo, secuencial_usuario, secuencial_role) FROM stdin;
    public          postgres    false    221   }?       ?           0    0 !   auditoria_bitacora_secuencial_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auditoria_bitacora_secuencial_seq', 1, false);
          public          postgres    false    214            ?           0    0    generales_anio_secuencial_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.generales_anio_secuencial_seq', 50, true);
          public          postgres    false    202            ?           0    0 #   generales_calendario_secuencial_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.generales_calendario_secuencial_seq', 600, true);
          public          postgres    false    200            ?           0    0    generales_estado_secuencial_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.generales_estado_secuencial_seq', 5, true);
          public          postgres    false    226            ?           0    0 $   indicadores_indicador_secuencial_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.indicadores_indicador_secuencial_seq', 34, true);
          public          postgres    false    216            ?           0    0 .   mando_integral_plan_estrategico_secuencial_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.mando_integral_plan_estrategico_secuencial_seq', 4, true);
          public          postgres    false    208            ?           0    0 7   mando_integral_poa_actividad_presupuesto_secuencial_seq    SEQUENCE SET     e   SELECT pg_catalog.setval('public.mando_integral_poa_actividad_presupuesto_secuencial_seq', 3, true);
          public          postgres    false    228            ?           0    0 +   mando_integral_poa_actividad_secuencial_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public.mando_integral_poa_actividad_secuencial_seq', 14, true);
          public          postgres    false    232            ?           0    0 )   mando_integral_poa_maestro_secuencial_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.mando_integral_poa_maestro_secuencial_seq', 2, true);
          public          postgres    false    218            ?           0    0 6   mando_integral_usuario_plan_estrategico_secuencial_seq    SEQUENCE SET     d   SELECT pg_catalog.setval('public.mando_integral_usuario_plan_estrategico_secuencial_seq', 4, true);
          public          postgres    false    210            ?           0    0     proceso_actividad_secuencial_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.proceso_actividad_secuencial_seq', 10, true);
          public          postgres    false    224            ?           0    0 +   proceso_objetivo_perspectiva_secuencial_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public.proceso_objetivo_perspectiva_secuencial_seq', 16, true);
          public          postgres    false    204            ?           0    0 "   proceso_observacion_secuencial_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.proceso_observacion_secuencial_seq', 25, true);
          public          postgres    false    230            ?           0    0 "   proceso_perspectiva_secuencial_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.proceso_perspectiva_secuencial_seq', 8, true);
          public          postgres    false    206            ?           0    0    seguridades_role_secuencial_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.seguridades_role_secuencial_seq', 19, true);
          public          postgres    false    222            ?           0    0    seguridades_usuario_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.seguridades_usuario_id_seq', 7, true);
          public          postgres    false    212            ?           0    0 '   seguridades_usuario_role_secuencial_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.seguridades_usuario_role_secuencial_seq', 7, true);
          public          postgres    false    220            ?           2606    4593010 /   seguridades_role PK_02d9306e25ca3483a2891759384 
   CONSTRAINT     w   ALTER TABLE ONLY public.seguridades_role
    ADD CONSTRAINT "PK_02d9306e25ca3483a2891759384" PRIMARY KEY (secuencial);
 [   ALTER TABLE ONLY public.seguridades_role DROP CONSTRAINT "PK_02d9306e25ca3483a2891759384";
       public            postgres    false    223                       2606    4520157 -   generales_anio PK_153125222686ddec880980d76c6 
   CONSTRAINT     u   ALTER TABLE ONLY public.generales_anio
    ADD CONSTRAINT "PK_153125222686ddec880980d76c6" PRIMARY KEY (secuencial);
 Y   ALTER TABLE ONLY public.generales_anio DROP CONSTRAINT "PK_153125222686ddec880980d76c6";
       public            postgres    false    203            ?           2606    4710401 /   generales_estado PK_156cfa70e6c02f397a505a5f7ed 
   CONSTRAINT     w   ALTER TABLE ONLY public.generales_estado
    ADD CONSTRAINT "PK_156cfa70e6c02f397a505a5f7ed" PRIMARY KEY (secuencial);
 [   ALTER TABLE ONLY public.generales_estado DROP CONSTRAINT "PK_156cfa70e6c02f397a505a5f7ed";
       public            postgres    false    227            ?           2606    4520228 ;   proceso_objetivo_perspectiva PK_21bc10817b4983c0e6ce552b926 
   CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_objetivo_perspectiva
    ADD CONSTRAINT "PK_21bc10817b4983c0e6ce552b926" PRIMARY KEY (secuencial);
 g   ALTER TABLE ONLY public.proceso_objetivo_perspectiva DROP CONSTRAINT "PK_21bc10817b4983c0e6ce552b926";
       public            postgres    false    205            ?           2606    4520468 4   indicadores_indicador PK_290be609674e665100b8f7975d6 
   CONSTRAINT     |   ALTER TABLE ONLY public.indicadores_indicador
    ADD CONSTRAINT "PK_290be609674e665100b8f7975d6" PRIMARY KEY (secuencial);
 `   ALTER TABLE ONLY public.indicadores_indicador DROP CONSTRAINT "PK_290be609674e665100b8f7975d6";
       public            postgres    false    217            ?           2606    4520276 2   seguridades_usuario PK_2975aa312cef0a05aa1a626e907 
   CONSTRAINT     z   ALTER TABLE ONLY public.seguridades_usuario
    ADD CONSTRAINT "PK_2975aa312cef0a05aa1a626e907" PRIMARY KEY (secuencial);
 ^   ALTER TABLE ONLY public.seguridades_usuario DROP CONSTRAINT "PK_2975aa312cef0a05aa1a626e907";
       public            postgres    false    213            ?           2606    4879794 2   proceso_observacion PK_3d0bb5047cc17fef3c1ea4e533c 
   CONSTRAINT     z   ALTER TABLE ONLY public.proceso_observacion
    ADD CONSTRAINT "PK_3d0bb5047cc17fef3c1ea4e533c" PRIMARY KEY (secuencial);
 ^   ALTER TABLE ONLY public.proceso_observacion DROP CONSTRAINT "PK_3d0bb5047cc17fef3c1ea4e533c";
       public            postgres    false    231            ?           2606    4520252 >   mando_integral_plan_estrategico PK_533c7b24d2152b235b03742056f 
   CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_plan_estrategico
    ADD CONSTRAINT "PK_533c7b24d2152b235b03742056f" PRIMARY KEY (secuencial);
 j   ALTER TABLE ONLY public.mando_integral_plan_estrategico DROP CONSTRAINT "PK_533c7b24d2152b235b03742056f";
       public            postgres    false    209            ?           2606    4520311 1   auditoria_bitacora PK_734674390c35df87ca28408c15a 
   CONSTRAINT     y   ALTER TABLE ONLY public.auditoria_bitacora
    ADD CONSTRAINT "PK_734674390c35df87ca28408c15a" PRIMARY KEY (secuencial);
 ]   ALTER TABLE ONLY public.auditoria_bitacora DROP CONSTRAINT "PK_734674390c35df87ca28408c15a";
       public            postgres    false    215            ?           2606    4823784 G   mando_integral_poa_actividad_presupuesto PK_92f19c4e829c3a697e2eb78c300 
   CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad_presupuesto
    ADD CONSTRAINT "PK_92f19c4e829c3a697e2eb78c300" PRIMARY KEY (secuencial);
 s   ALTER TABLE ONLY public.mando_integral_poa_actividad_presupuesto DROP CONSTRAINT "PK_92f19c4e829c3a697e2eb78c300";
       public            postgres    false    229            ?           2606    4520265 F   mando_integral_usuario_plan_estrategico PK_b1ae1a51c4d676b47e725280ed3 
   CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_usuario_plan_estrategico
    ADD CONSTRAINT "PK_b1ae1a51c4d676b47e725280ed3" PRIMARY KEY (secuencial);
 r   ALTER TABLE ONLY public.mando_integral_usuario_plan_estrategico DROP CONSTRAINT "PK_b1ae1a51c4d676b47e725280ed3";
       public            postgres    false    211            ?           2606    4592999 7   seguridades_usuario_role PK_d3bd30f408d77c8334cdc6b8e9d 
   CONSTRAINT        ALTER TABLE ONLY public.seguridades_usuario_role
    ADD CONSTRAINT "PK_d3bd30f408d77c8334cdc6b8e9d" PRIMARY KEY (secuencial);
 c   ALTER TABLE ONLY public.seguridades_usuario_role DROP CONSTRAINT "PK_d3bd30f408d77c8334cdc6b8e9d";
       public            postgres    false    221            }           2606    4520149 3   generales_calendario PK_db7f93c71d6bdaf65b3f7461926 
   CONSTRAINT     {   ALTER TABLE ONLY public.generales_calendario
    ADD CONSTRAINT "PK_db7f93c71d6bdaf65b3f7461926" PRIMARY KEY (secuencial);
 _   ALTER TABLE ONLY public.generales_calendario DROP CONSTRAINT "PK_db7f93c71d6bdaf65b3f7461926";
       public            postgres    false    201            ?           2606    4520241 2   proceso_perspectiva PK_e5f0518bc1be13b2e5cf5dd6446 
   CONSTRAINT     z   ALTER TABLE ONLY public.proceso_perspectiva
    ADD CONSTRAINT "PK_e5f0518bc1be13b2e5cf5dd6446" PRIMARY KEY (secuencial);
 ^   ALTER TABLE ONLY public.proceso_perspectiva DROP CONSTRAINT "PK_e5f0518bc1be13b2e5cf5dd6446";
       public            postgres    false    207            ?           2606    4600176 0   proceso_actividad PK_e6ddbd4f92d33295cbf0dfe256d 
   CONSTRAINT     x   ALTER TABLE ONLY public.proceso_actividad
    ADD CONSTRAINT "PK_e6ddbd4f92d33295cbf0dfe256d" PRIMARY KEY (secuencial);
 \   ALTER TABLE ONLY public.proceso_actividad DROP CONSTRAINT "PK_e6ddbd4f92d33295cbf0dfe256d";
       public            postgres    false    225            ?           2606    4879802 ;   mando_integral_poa_actividad PK_f647cd16897964287b09693509e 
   CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad
    ADD CONSTRAINT "PK_f647cd16897964287b09693509e" PRIMARY KEY (secuencial);
 g   ALTER TABLE ONLY public.mando_integral_poa_actividad DROP CONSTRAINT "PK_f647cd16897964287b09693509e";
       public            postgres    false    233            ?           2606    4558135 9   mando_integral_poa_maestro PK_fa5ea004ae5b2bd3ad080fde445 
   CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_maestro
    ADD CONSTRAINT "PK_fa5ea004ae5b2bd3ad080fde445" PRIMARY KEY (secuencial);
 e   ALTER TABLE ONLY public.mando_integral_poa_maestro DROP CONSTRAINT "PK_fa5ea004ae5b2bd3ad080fde445";
       public            postgres    false    219            ?           2606    4887593 /   seguridades_role UQ_04c9be038f3b479993c45241fa5 
   CONSTRAINT     r   ALTER TABLE ONLY public.seguridades_role
    ADD CONSTRAINT "UQ_04c9be038f3b479993c45241fa5" UNIQUE (nombre_rol);
 [   ALTER TABLE ONLY public.seguridades_role DROP CONSTRAINT "UQ_04c9be038f3b479993c45241fa5";
       public            postgres    false    223            ?           2606    4520472 2   seguridades_usuario UQ_2975aa312cef0a05aa1a626e907 
   CONSTRAINT     u   ALTER TABLE ONLY public.seguridades_usuario
    ADD CONSTRAINT "UQ_2975aa312cef0a05aa1a626e907" UNIQUE (secuencial);
 ^   ALTER TABLE ONLY public.seguridades_usuario DROP CONSTRAINT "UQ_2975aa312cef0a05aa1a626e907";
       public            postgres    false    213            ?           2606    4887587 4   indicadores_indicador UQ_7398c9e141d0e7882413ff89fef 
   CONSTRAINT     }   ALTER TABLE ONLY public.indicadores_indicador
    ADD CONSTRAINT "UQ_7398c9e141d0e7882413ff89fef" UNIQUE (nombre_indicador);
 `   ALTER TABLE ONLY public.indicadores_indicador DROP CONSTRAINT "UQ_7398c9e141d0e7882413ff89fef";
       public            postgres    false    217            ?           2606    4887591 >   mando_integral_plan_estrategico UQ_b864b4d65b32a0ce13e1401a569 
   CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_plan_estrategico
    ADD CONSTRAINT "UQ_b864b4d65b32a0ce13e1401a569" UNIQUE (nombre_plan_estrategico);
 j   ALTER TABLE ONLY public.mando_integral_plan_estrategico DROP CONSTRAINT "UQ_b864b4d65b32a0ce13e1401a569";
       public            postgres    false    209            ?           2606    4887589 ;   proceso_objetivo_perspectiva UQ_c1a979086237d75a367c73dcd81 
   CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_objetivo_perspectiva
    ADD CONSTRAINT "UQ_c1a979086237d75a367c73dcd81" UNIQUE (nombre_objetivo_perspectiva);
 g   ALTER TABLE ONLY public.proceso_objetivo_perspectiva DROP CONSTRAINT "UQ_c1a979086237d75a367c73dcd81";
       public            postgres    false    205            ?           2606    4887583 9   mando_integral_poa_maestro UQ_d20e03de6133a3aa42597cad14b 
   CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_maestro
    ADD CONSTRAINT "UQ_d20e03de6133a3aa42597cad14b" UNIQUE (nombre_poa_maestro);
 e   ALTER TABLE ONLY public.mando_integral_poa_maestro DROP CONSTRAINT "UQ_d20e03de6133a3aa42597cad14b";
       public            postgres    false    219            ?           2606    4710403 /   generales_estado UQ_e6bc435e11ac6fd0c842f2d945a 
   CONSTRAINT     u   ALTER TABLE ONLY public.generales_estado
    ADD CONSTRAINT "UQ_e6bc435e11ac6fd0c842f2d945a" UNIQUE (nombre_estado);
 [   ALTER TABLE ONLY public.generales_estado DROP CONSTRAINT "UQ_e6bc435e11ac6fd0c842f2d945a";
       public            postgres    false    227            ?           2606    4887585 0   proceso_actividad UQ_fca7b2376c2bbc5082000d59ad7 
   CONSTRAINT     y   ALTER TABLE ONLY public.proceso_actividad
    ADD CONSTRAINT "UQ_fca7b2376c2bbc5082000d59ad7" UNIQUE (nombre_actividad);
 \   ALTER TABLE ONLY public.proceso_actividad DROP CONSTRAINT "UQ_fca7b2376c2bbc5082000d59ad7";
       public            postgres    false    225            ?           2606    4879818 ;   mando_integral_poa_actividad FK_13578aeee496bd0b1d95bb8d7f6    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad
    ADD CONSTRAINT "FK_13578aeee496bd0b1d95bb8d7f6" FOREIGN KEY (secuencial_estado) REFERENCES public.generales_estado(secuencial);
 g   ALTER TABLE ONLY public.mando_integral_poa_actividad DROP CONSTRAINT "FK_13578aeee496bd0b1d95bb8d7f6";
       public          postgres    false    4005    233    227            ?           2606    4600199 0   proceso_actividad FK_2fdb968f0af445ef7b0cccd2940    FK CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_actividad
    ADD CONSTRAINT "FK_2fdb968f0af445ef7b0cccd2940" FOREIGN KEY (secuencial_poa_maestro) REFERENCES public.mando_integral_poa_maestro(secuencial);
 \   ALTER TABLE ONLY public.proceso_actividad DROP CONSTRAINT "FK_2fdb968f0af445ef7b0cccd2940";
       public          postgres    false    219    225    3991            ?           2606    4558159 9   mando_integral_poa_maestro FK_424461135ee757fcc3ba3aca94d    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_maestro
    ADD CONSTRAINT "FK_424461135ee757fcc3ba3aca94d" FOREIGN KEY (secuencial_plan_estrategico) REFERENCES public.mando_integral_plan_estrategico(secuencial);
 e   ALTER TABLE ONLY public.mando_integral_poa_maestro DROP CONSTRAINT "FK_424461135ee757fcc3ba3aca94d";
       public          postgres    false    219    209    3975            ?           2606    4520372 2   proceso_perspectiva FK_4868f0e836eeef335bdd13be30c    FK CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_perspectiva
    ADD CONSTRAINT "FK_4868f0e836eeef335bdd13be30c" FOREIGN KEY (secuencial_plan_estrategico) REFERENCES public.mando_integral_plan_estrategico(secuencial);
 ^   ALTER TABLE ONLY public.proceso_perspectiva DROP CONSTRAINT "FK_4868f0e836eeef335bdd13be30c";
       public          postgres    false    207    209    3975            ?           2606    4558164 9   mando_integral_poa_maestro FK_5cf550abd5d2515e8c6443cc922    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_maestro
    ADD CONSTRAINT "FK_5cf550abd5d2515e8c6443cc922" FOREIGN KEY (secuencial_anio) REFERENCES public.generales_anio(secuencial);
 e   ALTER TABLE ONLY public.mando_integral_poa_maestro DROP CONSTRAINT "FK_5cf550abd5d2515e8c6443cc922";
       public          postgres    false    203    219    3967            ?           2606    4879803 2   proceso_observacion FK_614d722ab3158f57615dd643299    FK CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_observacion
    ADD CONSTRAINT "FK_614d722ab3158f57615dd643299" FOREIGN KEY (secuencial_poa_actividad) REFERENCES public.mando_integral_poa_actividad(secuencial);
 ^   ALTER TABLE ONLY public.proceso_observacion DROP CONSTRAINT "FK_614d722ab3158f57615dd643299";
       public          postgres    false    4013    231    233            ?           2606    4823790 G   mando_integral_poa_actividad_presupuesto FK_64cb9b909f29fdcf9f43214668d    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad_presupuesto
    ADD CONSTRAINT "FK_64cb9b909f29fdcf9f43214668d" FOREIGN KEY (secuencial_actividad) REFERENCES public.proceso_actividad(secuencial);
 s   ALTER TABLE ONLY public.mando_integral_poa_actividad_presupuesto DROP CONSTRAINT "FK_64cb9b909f29fdcf9f43214668d";
       public          postgres    false    4001    225    229            ?           2606    4520377 F   mando_integral_usuario_plan_estrategico FK_6faaf32c6be11f06b7bd47fadc9    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_usuario_plan_estrategico
    ADD CONSTRAINT "FK_6faaf32c6be11f06b7bd47fadc9" FOREIGN KEY (secuencial_plan_estrategico) REFERENCES public.mando_integral_plan_estrategico(secuencial);
 r   ALTER TABLE ONLY public.mando_integral_usuario_plan_estrategico DROP CONSTRAINT "FK_6faaf32c6be11f06b7bd47fadc9";
       public          postgres    false    211    3975    209            ?           2606    4520367 ;   proceso_objetivo_perspectiva FK_72c8f63d10b9aa55b5d563d1b2b    FK CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_objetivo_perspectiva
    ADD CONSTRAINT "FK_72c8f63d10b9aa55b5d563d1b2b" FOREIGN KEY (secuencial_perspectiva) REFERENCES public.proceso_perspectiva(secuencial);
 g   ALTER TABLE ONLY public.proceso_objetivo_perspectiva DROP CONSTRAINT "FK_72c8f63d10b9aa55b5d563d1b2b";
       public          postgres    false    3973    207    205            ?           2606    4520478 4   indicadores_indicador FK_803f95d8ecc3c33914f9a30c868    FK CONSTRAINT     ?   ALTER TABLE ONLY public.indicadores_indicador
    ADD CONSTRAINT "FK_803f95d8ecc3c33914f9a30c868" FOREIGN KEY (secuencial_objetivo_perspectiva) REFERENCES public.proceso_objetivo_perspectiva(secuencial);
 `   ALTER TABLE ONLY public.indicadores_indicador DROP CONSTRAINT "FK_803f95d8ecc3c33914f9a30c868";
       public          postgres    false    217    205    3969            ?           2606    4593058 7   seguridades_usuario_role FK_89d6a72c7634878ed5472ea0a6a    FK CONSTRAINT     ?   ALTER TABLE ONLY public.seguridades_usuario_role
    ADD CONSTRAINT "FK_89d6a72c7634878ed5472ea0a6a" FOREIGN KEY (secuencial_role) REFERENCES public.seguridades_role(secuencial);
 c   ALTER TABLE ONLY public.seguridades_usuario_role DROP CONSTRAINT "FK_89d6a72c7634878ed5472ea0a6a";
       public          postgres    false    223    221    3997            ?           2606    4593053 7   seguridades_usuario_role FK_8a88bbbcb477517b02ca9e88195    FK CONSTRAINT     ?   ALTER TABLE ONLY public.seguridades_usuario_role
    ADD CONSTRAINT "FK_8a88bbbcb477517b02ca9e88195" FOREIGN KEY (secuencial_usuario) REFERENCES public.seguridades_usuario(secuencial);
 c   ALTER TABLE ONLY public.seguridades_usuario_role DROP CONSTRAINT "FK_8a88bbbcb477517b02ca9e88195";
       public          postgres    false    221    213    3981            ?           2606    4879808 ;   mando_integral_poa_actividad FK_a03cdf201786a4a89cdc5f7eb93    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad
    ADD CONSTRAINT "FK_a03cdf201786a4a89cdc5f7eb93" FOREIGN KEY (secuencial_poa_maestro) REFERENCES public.mando_integral_poa_maestro(secuencial);
 g   ALTER TABLE ONLY public.mando_integral_poa_actividad DROP CONSTRAINT "FK_a03cdf201786a4a89cdc5f7eb93";
       public          postgres    false    3991    233    219            ?           2606    4875322 G   mando_integral_poa_actividad_presupuesto FK_a81ef65b2ac005a33f74a06413b    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad_presupuesto
    ADD CONSTRAINT "FK_a81ef65b2ac005a33f74a06413b" FOREIGN KEY (secuencial_poa_maestro) REFERENCES public.mando_integral_poa_maestro(secuencial);
 s   ALTER TABLE ONLY public.mando_integral_poa_actividad_presupuesto DROP CONSTRAINT "FK_a81ef65b2ac005a33f74a06413b";
       public          postgres    false    3991    229    219            ?           2606    4520483 F   mando_integral_usuario_plan_estrategico FK_b0910728337291b670f267fec89    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_usuario_plan_estrategico
    ADD CONSTRAINT "FK_b0910728337291b670f267fec89" FOREIGN KEY (secuencial_usuario) REFERENCES public.seguridades_usuario(secuencial);
 r   ALTER TABLE ONLY public.mando_integral_usuario_plan_estrategico DROP CONSTRAINT "FK_b0910728337291b670f267fec89";
       public          postgres    false    3981    211    213            ?           2606    4600189 0   proceso_actividad FK_b4c5c1cbf1e9f3154924de6169e    FK CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_actividad
    ADD CONSTRAINT "FK_b4c5c1cbf1e9f3154924de6169e" FOREIGN KEY (secuencial_indicador) REFERENCES public.indicadores_indicador(secuencial);
 \   ALTER TABLE ONLY public.proceso_actividad DROP CONSTRAINT "FK_b4c5c1cbf1e9f3154924de6169e";
       public          postgres    false    217    3987    225            ?           2606    4879823 ;   mando_integral_poa_actividad FK_c711279f41c6e70da7ed5dc4f40    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad
    ADD CONSTRAINT "FK_c711279f41c6e70da7ed5dc4f40" FOREIGN KEY (secuencial_calendario) REFERENCES public.generales_calendario(secuencial);
 g   ALTER TABLE ONLY public.mando_integral_poa_actividad DROP CONSTRAINT "FK_c711279f41c6e70da7ed5dc4f40";
       public          postgres    false    3965    201    233            ?           2606    4600194 0   proceso_actividad FK_e1f28a7a56650951864e87539ce    FK CONSTRAINT     ?   ALTER TABLE ONLY public.proceso_actividad
    ADD CONSTRAINT "FK_e1f28a7a56650951864e87539ce" FOREIGN KEY (secuencial_role) REFERENCES public.seguridades_role(secuencial);
 \   ALTER TABLE ONLY public.proceso_actividad DROP CONSTRAINT "FK_e1f28a7a56650951864e87539ce";
       public          postgres    false    3997    225    223            ?           2606    4520312 3   generales_calendario FK_eb877d8bea3baf6ee39c76fe468    FK CONSTRAINT     ?   ALTER TABLE ONLY public.generales_calendario
    ADD CONSTRAINT "FK_eb877d8bea3baf6ee39c76fe468" FOREIGN KEY (secuencial_anio) REFERENCES public.generales_anio(secuencial);
 _   ALTER TABLE ONLY public.generales_calendario DROP CONSTRAINT "FK_eb877d8bea3baf6ee39c76fe468";
       public          postgres    false    3967    201    203            ?           2606    4879813 ;   mando_integral_poa_actividad FK_fb8f93b93f1a736a8bb2b785c97    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mando_integral_poa_actividad
    ADD CONSTRAINT "FK_fb8f93b93f1a736a8bb2b785c97" FOREIGN KEY (secuencial_actividad) REFERENCES public.proceso_actividad(secuencial);
 g   ALTER TABLE ONLY public.mando_integral_poa_actividad DROP CONSTRAINT "FK_fb8f93b93f1a736a8bb2b785c97";
       public          postgres    false    4001    233    225            S      x?????? ? ?      G   ?   x?бq?@??W??I?|??_??????ӧ?N%?d?d???I????W?Ң??HJ?bi?`Z*?.NO/χ????xn:?Eǳ?x:????K??C?????A??P?????xcośE???x??x??x{p?-o???s??8????????????e????/?n>K      E   ?  x?U?ˮ\UD?}>?yv?0?
????????۵?Y?BBx???^oo_߾???v??????y?}???_?q????O?#???Cu?~???'?#?g????o???A|??|??ǧ?/??\??o?5`?}????o???O'?c?mYOp?q"^c?????"=?D_c?m??9S???y???x???1Ծl??
x??">?P_?C??~CE\?P?*?^?
><T?Y?
??P??1Ա?O?C?qCE\߇????"?c??G??C_*?Q?
|??_c?s9?*`CE??P???"c???*??CE~ԡ??*?U?:??^?
\?P?r????;q,y?????????ۢ_?c.z@]???聹???1= =b.zı??r?#?????=r[????u????????\??\????Ǣ??W.z?\??^??mу???E?????Z^s?r?_???N?N?]'粓??@[w???P]x?n<?+????m.?0?^??/????/??X QS@͔@X5?ت*R??_??s???>???d????? ?????? ??????"Y?G}??SA?"?(?,??8,??)?fJ#?ڨ???Hu?=`?#L})?`(D>S"Aj$?H????)??ꤢ
?"?Z??)?0???J0?RN????n??\j?]ª????
v??"h? ?`dX0`
u?h?``,?g?]E0ЂH???`???E?*??M0?&?{?@X0 #[0??=?_^S0?FS?`M0
?(???`@
y?`??`P??6?(?`?P-X?f???l? L??.Ml?Q4?(R?????	S0A
&?)?`?L`?DM05S0a?⨂?H???\9?`?L??	?`?)? X0Q?朂	?`*?`*?5?GD???E??ȯ??k ?\???_74??l_8??"??̙?	S0A
&??)? X0QL?LXSQS??mG?L???L0SN?)?????`j?`?*??*?
v??a?`?R0?,0??`4E0?	v?'j?]E0ЂH???`???ES?&E?=?`?,???-`??? ?????&E?=?`?,??E?AA`??)??)??M0?&?{?@?#? #[0??S0?FS?`M0?l?/{9<S0A
&?)?`?L`?DM05S0a??#T?`?0?`?L0SN?)?????`4?@!??????H??-`
&L?)?`???	R0`-DM05S0aLEL??t{@?ԁ????y???C??7;`^??~??)?;???(???"۹?M??)??/??S0A
&?`?&??)??
??
???Q?BX0 #[0??S0?FS?`Q?#?
v?@X0 #[0??S0?M9r?`M0
?(???`@
F?`??GQ??6?(?`?P-`??,??L??.Ml?Q4?(,?+?Z? 9)ق??A]0?"??h?Q?`?}9ʑC??	R0?L9?`&j????	?`?ȡ";ր)?0?`?!?r
&H?L??)GaLELE
vlS0a
&H?C0?L?????!j????	?`*?`*R?c??	S0A
&??}??`&j????	?`*?`*?u?7(ЯP>r?%???(??Q?|????My?۫E{???`?;?@X0 #[0??S0?FS?`<~5?(,?P-`???l? L??.X4??!l?Q4?(,?#?Z0??)ق,`9D]0?"??h?QX?g@?`?R??>r,0??`4E0?	F???`??"h?|??`dX0`
u?h?``??	F????r?#??Ͽ???|&??300???LS???|_?v??⿟?e????{      _   E   x?3?p?s?t?q?2?t???t??2????sL8??C\???SN?`נ0GgO??`?=... ]u?      U   ?  x??U?n?6=S_?cE+?v?䰇?m?v??c/c?Q?J???4????????7?e;?S?fkf?̼y3?Ē|Ԟd???h????ne??q????.Huދ??8I6??W?X?L?*???GR?YΧxi~??f1-f?Wc?*C??6?s)^{?d9?q?h.V???5N??We?r%?h6H??T?Fcģ?????.$??ѡqbV\????`j?$u?~Pq??"???1/o???&?n??f?+qG!??-g???!??4 ?NרY\?⎋bZ???~???#??G??wefʥ4%??~?(:oxԲ?{\???[??2X?8??ވO9?չZü????D??X4??????.??w$?EQU{??R9?t??H?ٹ??L]f?mL?*juC???*d
0<??:?????V???H^,'?w={?܋?B???r??d??:JxsqOфRyA??a?мj9L????:bM.?wlZ? 䆹?<A??_k?^????o?t?c?k?y????8???:??Eu?L-?6?+??K???;Ğ?Yh?rf"?N'b??2?mSaL?f?{y?+?ln????Ԋ?bZ?浇Bw????߂a?p[zr?????i??_,,?7?^3?	?8??kj!???*?I1????y??þԮu??9?W̵??%Qk./?aq)\?;>)?SC??2??*$~Ί^?a?????^??G?^Uzí%?䓆eڀi>t?W?R?Y8??!?^??????^*?	?v@??X??$????bak?|?
?ϡǟ?z?Q7?w?e?0????pJ???????>N<?~[?q?phD?g"???٨?t????#?c2??2?0+fZ?w????4[??mz??? M??&I???Bk??????S$?y1??%@I~L???.??\|?5s????w|??'4?(???(??t??      M   [   x?3??q?Sp	r9??????`d`d?$L8A,a?e?]?)H?H?)???2Ʈ?????Ē??2????????D?q??qqq Ћ%?      e   }   x?e???0D??a"?????Zqh?T?????A?n??_???qi?ɵ???jo6?QY??%??*iqY?\o???NuQHp?|?l??x!	?dx??`?_y???"N???????E3?      a   (   x?3?4400?30?4?4?2?4?󌸌9??<c?=... ???      W   L   x?5?K?P?sW
???????d?8*?unv??+*
c؄a1?Ă3|????$???H?&
???Ƴ? ???      O   9   x?3?4?t?wv?r?,?2?4B??\??}|\????&@?x'G?( 'F??? ??a      ]   o  x??TMO1=;?b? E?II??Ph??{?ؓ????loZ?7{?Pq?u?X??n????\?;??{o<RS?Jt???=?+v?C?#?BA?;^V?O?R7WoA?<???}uJ???8??)??14r?????('Q??'?Ak??v????C????C?ɮ???s4?F?7??^*??
?+?T??yt?~+?j??~?$???)?\??Q?i _????T?b`?N[?֔:q?O2\???:T'1?ܑ? ,*?}_Ғ?e???)??l?XUPf?E?^??.??H????)Ŵ9hB??S?W E.???-M??? s(?YG;???պ?^n?{??$#?ַ?vz?o!fW?c8߸?>;k+0?Ӳ?????d???LF?ei???M?][??lu/	???/l?????ʀР?ێ?hG|?[???A????????CX9?#?D???n?7??:\????~r?????Ȏ)?ъ?S4:4z??ܔF?????4?^]9?@???j?????I?[?.#,???????
kJ? ?pD??kFKV?K??_?i???U??~??Z?^Ep??D5:??R??F???zb????T?a????̯P?Mզ|7??I????? 5!9      I   ?  x?mRAr1<k_???? ??e?????ˠ??Ҏ?H?
??p??1F???iW?????f*?h ?l?v
?P????t??z????Xkb`Gp?(pl?-?D<?e???????\?1?$?h??rO?s?D);
^ї?г5?"??w1????W?k??G????|8)?????G?lc???????Nь?F??? Z_?V?P?:???????==????????h??m???%e???????$???L?;Dkf1? ??_??X?S?u??{s?Йqӎ?7Y??????#9??3?.???I????6?W?c3?Tĩi???V?e??	??W]=C?U???P????2h~??"(?a??Wǟe\m??O??򼩦?A?s???r??S??c??a&?P?X=W Ģw?W?^,?????x/S??ۦi? ?{?      c   `  x??UIn?0]S??????]?.?(??0h?qh??$?*z?\?????r] ???{?S@??e?@??????}???!????
4???ܱ\X"??????L??5OY??Y?	l?̃L?۶
G@???B1e???o6???,???>L,Ӧ??!?"ބ?7C??*???!*S?~?t?Z?y?????2??E????3?:O9)???aw?s??=?+??׊Yċ?e??HD??aڕ=???|h???B0?:䋃#w????{%?	?@? ?c?S?
?9?9x??
ޟ??|?"?"E?U?LOo?S?=(?	+/2H3??BS???,V_?V??r?9~A?h%?ğ?眄d2?`?E?|j??ih?ؗm?V?i=?M??Z?????P?.????܉??Z2?dR??T??!ݫ??Um(?X?n?-?R_???Ojx?????38?IZ???`?Bz?r?5\Op??2&?O8/[*pl1 ??,???pD?b8n+?.???Q2B??DZc???9cai@ri?X?????}?]?l?e0?^	w=????$<?pj???Ō??&j?c:?QeB???II?r9????&4???????D????l???&???,??2??      K   x   x?}?A?@?u{?9?	U?mSjR"-?1&oő?????????n??b?$??????%M???????%J?d??d?m?Z]???>؋G?#	??{??? ?? ??@x??O??A1K      [   D  x?m?MN?0???)| ?H?????	Z5]?1?4H??v?Xr,??\?"]Şo?ߛI*??R???ʖh??H?4??U???>??"j??D???)???.>X'??Z>?k? ????Dn?[de?G??e?<??aN&(M???KMŅ؃o??ꮎ??????a?3??(~'??G????9[??fT?C?4I6?+2?s???t??d.& ??W1Y:??b??ⲃ???5}?3??ui!?d'?G?[?Ƽk?????b ??NX~g?䌬?lyHg????s?Q?$ƥm{???,?ȿ??ؿ??=O???ٻ(      Q   ?   x?u??j?@????U?
?????<:?F&F](??43J$Fи?Wߴƥۏ????Mq?D??	?1??fV+???~???????Յ??Q[w???'?.d
]$ ??X?x?eB2???cm?=N?fA<]`QZ[???}S?yG<????????r?\r?>3P9?`??^1?J?%Z,rcJ?5?CC?HM???;n?z?羒(?~?SW?      Y   E   x?3?,?t?ww??qu??4?2
8?;9?Fqs???s????C?9??P??,PL?b???? {?9     