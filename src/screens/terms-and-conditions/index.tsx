import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptTermsAndConditions,
  rejectTermsAndConditions,
} from '../../store/actions';

const screenHeight = Dimensions.get('window').height;

function TermsAndConditions({ navigation }) {
  const scrollViewRef = useRef();
  const { userId } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  const handleConfirmation = () => {
    dispatch(acceptTermsAndConditions(userId));
  };

  const handleReject = () => {
    dispatch(rejectTermsAndConditions());
  };

  // const handleScroll = (event) => {
  //   const scrollPosition = event.nativeEvent.contentOffset.y;
  //   const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
  //   const contentHeight = event.nativeEvent.contentSize.height;

  //   // Si el usuario ha desplazado hasta el final, muestra el botón de aceptar
  //   if (scrollViewHeight + scrollPosition >= contentHeight - 20) {
  //     setAcceptVisible(true);
  //   } else {
  //     setAcceptVisible(false);
  //   }
  // };

  // const handleAccept = () => {
  //   // Manejo del evento aceptar
  //   navigation.navigate("Home");
  // };

  // const handleReject = () => {
  //   // Manejo del evento rechazar
  //   // Aquí puedes agregar la lógica para manejar el rechazo como borrar el userId
  //   navigation.goBack();
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        // ref={scrollViewRef}
        // onScroll={handleScroll}
        // scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.header}>
            TÉRMINOS Y CONDICIONES PARA EL USUARIO: INTRODUCCIÓN:
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>
              <Text style={styles.underline}>BILLETE GLOBAL INC</Text>
            </Text>
            , Delaware Corporation, Address 251 Little Falls Dr, Wilmington, DE
            19808 (“la Empresa”), sociedad constituida y registrada en Estados
            Unidos{' '}
            <Text style={styles.italic}>
              SE LIMITA A OPERAR COMO PROVEEDOR DE SERVICIOS BITCOIN Y PROVEEDOR
              DE SERVICIOS ACTIVOS DIGITALES COMO: Custodio de Criptomonedas y
              Activos Digitales, Casas de Intercambio Digital o Exchange,
              Billetera Digital y Procesador de Pago DE CONFORMIDAD CON LA
              LEGISLACIÓN DE ESTADOS UNIDOS.
            </Text>
            Los servicios provistos por la empresa podrán ser ejecutados por
            proveedores que la empresa designe a su discreción de acuerdo a las
            leyes de los países en los que opera.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Los Términos y Condiciones (“TyC”) rigen para las operaciones que
            realicen los usuarios habilitados (los “Usuarios”) con la plataforma
            ofrecidas por BILLETE GLOBAL INC (en “la Empresa”), sociedad
            constituida y registrada en Estados Unidos, y a los proveedores que
            la empresa designa a su discreción de acuerdo a las leyes de los
            países en los que opera. También serán de aplicación para todas las
            promociones de productos, en lo que resulten de aplicación, y se
            encuentran disponibles en la página web (https://www.billete.io),
            junto con las Políticas de Privacidad y Políticas de Cookies de la
            Compañía. Al hacer clic en “aceptar” los TyC en la Plataforma, el
            Usuario reconoce que ha leído y entendido los mismos en su
            totalidad, que ha aceptado su contenido y que estos TyC constituyen
            un acuerdo vinculante entre el Usuario y la Empresa.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>
            <Text style={styles.underline}>
              1. Actualización de los Términos y condiciones:
            </Text>
          </Text>
          <Text style={styles.text}>
            La Empresa se reserva el derecho de revisar estos TyC en cualquier
            momento, actualizando y/o modificándolos. Cualquier actualización en
            nuestras políticas será informada a los usuarios. El Usuario deberá
            leer atentamente los Términos y Condiciones y sus modificaciones.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>
            <Text style={styles.underline}>
              2. Vigencia de los Términos y condiciones:
            </Text>
          </Text>
          <Text style={styles.text}>
            Todos los términos modificados entrarán en vigor desde el momento de
            su publicación y se presumirán aceptados por el Usuario, que será
            notificado de las modificaciones y permitirá a la Empresa registrar
            dichas aceptaciones.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>
            <Text style={styles.underline}>3. Disconformidad del usuario:</Text>
          </Text>
          <Text style={styles.text}>
            Cualquier disconformidad o duda podrá ser resuelta en los canales de
            comunicación oficiales. En caso de disconformidad por parte del
            Usuario, la Empresa procederá al cierre de la Cuenta del Usuario
            previa solicitud de instrucción al Usuario sobre el destino a dar a
            cualquier tipo de Activos Digitales registrados en su Cuenta; hasta
            tanto la Empresa no reciba dicha órden, la Cuenta permanecerá
            bloqueada.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>
            <Text style={styles.underline}>4. Definiciones:</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}></Text> a. Activo Digital: Es cualquier
            activo que sea ofrecido por la Plataforma actualmente o en el
            futuro, incluyendo criptoactivos.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}></Text>b.Billetera: Es una aplicación de
            software u otro mecanismo, cuya finalidad es la custodia y
            transferencia de Activos Digitales.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}></Text>c. Cuenta: Es el registro en la
            Plataforma mediante el cual se identifica a cada Usuario y sus
            operaciones.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}></Text>d. Conversión: Es la Conversión
            interna automatizada ordenada por el Titular de la Cuenta y llevada
            a cabo por la Empresa para convertir Activos Digitales por otro u
            otros.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}></Text>e. Plataforma: Es la Aplicación
            disponible para su descarga a través de la página web oficial,
            Appstore y PlayStore o la que en el futuro así lo ofrezca.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}></Text>f. Servicios: Son los servicios
            ofrecidos a los Usuarios por la Plataforma que incluyen la compra,
            venta, canje, permuta, y la custodia Activos Digitales que en el
            futuro se habiliten en su Billetera.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}></Text>g. Usuario: Es la una persona
            física, mayor de edad y plenamente capaz, de acuerdo con la
            legislación vigente de la jurisdicción de su domicilio, que acepta
            los TyC con la finalidad de ser Titular de una Cuenta en la
            Plataforma y utilizar los Servicios ofrecidos por la misma conforme
            los presentes TyC.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.italic}>h. Airdrop:</Text> refiere a un
            procedimiento de distribución de nuevos tokens o criptomonedas o los
            ya existentes otorgados a poseedores de Activos Digitales.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>
            TÉRMINOS Y CONDICIONES PARA EL USUARIO: CAPÍTULO I: CUENTA Y
            JURISDICCIONES.
          </Text>
          <Text style={styles.subHeader}>
            <Text style={styles.underline}>
              1. Alta de Cuenta en la Plataforma:
            </Text>
          </Text>
          <Text style={styles.text}>
            El usuario proporcionará información veraz y precisa, en carácter de
            declaración jurada, para la apertura de la cuenta en la Plataforma.
            La Empresa podrá solicitarle información complementaria para
            continuar operando, y en caso de disconformidad se aplicará el
            procedimiento correspondiente. El Usuario se compromete a mantener
            actualizada, la totalidad de la información solicitada y será el
            único responsable por los daños que la falta de dicha actualización
            pueda ocasionar. Cada Usuario podrá ser únicamente titular de una
            Cuenta en la Plataforma. En lo relativo a los datos personales, se
            encuentra disponible en los canales oficiales la declaración de
            privacidad.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>
            <Text style={styles.underline}>
              2. Jurisdicciones restringidas:
            </Text>
          </Text>
          <Text style={styles.text}>
            Las siguientes jurisdicciones se encuentran restringidas para el uso
            de la Plataforma: Argelia, Bangladesh, Bielorrusia, Birmania,
            Burundi, República Centroafricana, Corea del Norte, Costa de Marfil,
            Crimea, Cuba, República Democrática del Congo, Hong Kong, Irán,
            Irak, Kazajistán, Líbano, Libia, Liberia, Mali, Nicaragua, Nepal,
            Palestina, Qatar, Rusia, Somalia, Sudán y Darfur, Sudán del Sur,
            Siria, Ucrania, Vanuatu, Vietnam, Yemen, Zimbabue.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>2.1.</Text>
          <Text style={styles.text}>
            Las anteriores son consideradas por la Empresa como jurisdicciones
            en las que nos reservamos el derecho a prestar nuestros servicios,
            ya sea porque son de alto riesgo, o porque cuentan con medidas
            débiles para la prevención del lavado de dinero y el financiamiento
            al terrorismo o porque que tienen deficiencias estratégicas de
            acuerdo con estándares internacionales o locales en estas materias
            de PLD/FT.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>
            2.2. <Text style={styles.underline}>Derecho de admisión:</Text>
          </Text>
          <Text style={styles.text}>
            La Empresa se reserva el derecho de rechazar el registro de una
            Cuenta, a personas cuyas nacionalidad, ciudadanía o ubicación sea de
            las antedichas. La Empresa se reserva el derecho de rechazar el
            registro de una nueva Cuenta, a su entera discreción y/o en virtud
            de la normativa aplicable.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>
            <Text style={styles.underline}>3. Acceso a Cuenta:</Text>
          </Text>
          <Text style={styles.text}>
            La Empresa podrá bloquear el acceso a la Plataforma y/o cancelar
            cualquier operación en curso si la Empresa considera que el Usuario
            ha incumplido alguno de los Términos y Condiciones. Sin perjuicio de
            ello, el Usuario recibirá comunicación fehaciente informándole dicha
            decisión.
          </Text>
        </View>

        {/* <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
          accusantium laudantium corporis vero expedita optio repellendus
          impedit atque exercitationem aliquid, doloremque itaque quia quaerat
          eligendi corrupti earum consequatur, laboriosam ab? Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Temporibus modi blanditiis illo
          ab nesciunt iste quibusdam praesentium quis sed unde tempore, facilis
          dolores odit vel repellendus. Blanditiis doloribus molestias
          laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sit cumque modi consectetur eveniet ab aliquam ipsa. Minus iure
          necessitatibus nemo nobis quas facere corporis quod sit. Quas
          doloremque molestias repellat? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Porro, ab tempora enim sint possimus, rerum fugit
          dolor qui ullam libero quaerat! Sapiente minima facilis nobis quam
          consequatur nesciunt molestiae cum! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Quod eveniet quam illo minus
          consectetur odio atque sequi recusandae suscipit numquam odit, nisi
          facilis ducimus expedita enim eaque laboriosam dolore quia! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          nesciunt, quasi minima ad nobis ut quo vel minus magni officia dolor
          ullam possimus quisquam commodi. Fugit quisquam similique at optio.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea rem
          explicabo aspernatur reiciendis tempore repellat, adipisci, nam
          reprehenderit architecto ad nesciunt nostrum, nemo enim itaque
          ratione. Facere nam quas repellat! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Quae magni quia nihil, debitis veniam
          aliquam libero consequuntur nulla at quidem non expedita voluptatibus
          eaque ea nobis minima obcaecati tenetur laboriosam. Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Aliquid quidem eaque quibusdam
          natus, alias vitae necessitatibus porro explicabo soluta eos, maxime
          culpa sit nesciunt, in sint! Nostrum ducimus magni fugit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Incidunt ratione
          obcaecati eos aperiam explicabo ex laboriosam itaque. Recusandae,
          vitae nulla. Alias quia rem corrupti nisi ut. Accusamus corrupti ipsa
          odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Obcaecati accusantium laudantium corporis vero expedita optio
          repellendus impedit atque exercitationem aliquid, doloremque itaque
          quia quaerat eligendi corrupti earum consequatur, laboriosam ab? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Temporibus modi
          blanditiis illo ab nesciunt iste quibusdam praesentium quis sed unde
          tempore, facilis dolores odit vel repellendus. Blanditiis doloribus
          molestias laudantium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sit cumque modi consectetur eveniet ab aliquam ipsa.
          Minus iure necessitatibus nemo nobis quas facere corporis quod sit.
          Quas doloremque molestias repellat? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Porro, ab tempora enim sint possimus,
          rerum fugit dolor qui ullam libero quaerat! Sapiente minima facilis
          nobis quam consequatur nesciunt molestiae cum! Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Quod eveniet quam illo minus
          consectetur odio atque sequi recusandae suscipit numquam odit, nisi
          facilis ducimus expedita enim eaque laboriosam dolore quia! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          nesciunt, quasi minima ad nobis ut quo vel minus magni officia dolor
          ullam possimus quisquam commodi. Fugit quisquam similique at optio.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea rem
          explicabo aspernatur reiciendis tempore repellat, adipisci, nam
          reprehenderit architecto ad nesciunt nostrum, nemo enim itaque
          ratione. Facere nam quas repellat! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Quae magni quia nihil, debitis veniam
          aliquam libero consequuntur nulla at quidem non expedita voluptatibus
          eaque ea nobis minima obcaecati tenetur laboriosam. Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Aliquid quidem eaque quibusdam
          natus, alias vitae necessitatibus porro explicabo soluta eos, maxime
          culpa sit nesciunt, in sint! Nostrum ducimus magni fugit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Incidunt ratione
          obcaecati eos aperiam explicabo ex laboriosam itaque. Recusandae,
          vitae nulla. Alias quia rem corrupti nisi ut. Accusamus corrupti ipsa
          odit.
        </Text> */}
        <View style={styles.submitContainer}>
          <TouchableOpacity onPress={handleConfirmation} style={styles.button}>
            <Text style={styles.buttonText}>
              CONFIRMAR TÉRMINOS Y CONDICIONES
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            // disabled={!formState.isFormValid}
            onPress={handleReject}
            style={styles.rejectButton}
          >
            <Text style={styles.buttonText}>
              RECHAZAR TÉRMINOS Y CONDICIONES
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TermsAndConditions;
