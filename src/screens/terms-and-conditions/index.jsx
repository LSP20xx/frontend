import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { getStyles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const screenHeight = Dimensions.get("window").height;

const TermsAndConditions = ({ navigation }) => {
  const scrollViewRef = useRef();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const htmlContent = `<!DOCTYPE html>
  <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="ProgId" content="Word.Document">
  <meta name="Generator" content="Microsoft Word 15">
  <meta name="Originator" content="Microsoft Word 15">
  <link rel="File-List" href="TÉRMINOS%20Y%20CONDICIONES%20PARA%20EL%20USUARIO-2.fld/filelist.xml">
  <!--[if gte mso 9]><xml>
   <o:DocumentProperties>
    <o:Author>Microsoft Office User</o:Author>
    <o:LastAuthor>Microsoft Office User</o:LastAuthor>
    <o:Revision>2</o:Revision>
    <o:TotalTime>0</o:TotalTime>
    <o:Created>2024-04-25T00:03:00Z</o:Created>
    <o:LastSaved>2024-04-25T00:03:00Z</o:LastSaved>
    <o:Pages>16</o:Pages>
    <o:Words>7696</o:Words>
    <o:Characters>42328</o:Characters>
    <o:Lines>352</o:Lines>
    <o:Paragraphs>99</o:Paragraphs>
    <o:CharactersWithSpaces>49925</o:CharactersWithSpaces>
    <o:Version>16.00</o:Version>
   </o:DocumentProperties>
  </xml><![endif]-->
  <link rel="dataStoreItem" href="TÉRMINOS%20Y%20CONDICIONES%20PARA%20EL%20USUARIO-2.fld/item0001.xml" target="TÉRMINOS%20Y%20CONDICIONES%20PARA%20EL%20USUARIO-2.fld/props002.xml">
  <link rel="themeData" href="TÉRMINOS%20Y%20CONDICIONES%20PARA%20EL%20USUARIO-2.fld/themedata.thmx">
  <link rel="colorSchemeMapping" href="TÉRMINOS%20Y%20CONDICIONES%20PARA%20EL%20USUARIO-2.fld/colorschememapping.xml">
  <!--[if gte mso 9]><xml>
   <w:WordDocument>
    <w:TrackMoves>false</w:TrackMoves>
    <w:TrackFormatting/>
    <w:HyphenationZone>21</w:HyphenationZone>
    <w:PunctuationKerning/>
    <w:ValidateAgainstSchemas/>
    <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
    <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
    <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
    <w:DoNotPromoteQF/>
    <w:LidThemeOther>ES-AR</w:LidThemeOther>
    <w:LidThemeAsian>X-NONE</w:LidThemeAsian>
    <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
    <w:Compatibility>
     <w:BreakWrappedTables/>
     <w:SnapToGridInCell/>
     <w:WrapTextWithPunct/>
     <w:UseAsianBreakRules/>
     <w:DontGrowAutofit/>
     <w:SplitPgBreakAndParaMark/>
     <w:EnableOpenTypeKerning/>
     <w:DontFlipMirrorIndents/>
     <w:OverrideTableStyleHps/>
    </w:Compatibility>
    <w:DoNotOptimizeForBrowser/>
    <m:mathPr>
     <m:mathFont m:val="Cambria Math"/>
     <m:brkBin m:val="before"/>
     <m:brkBinSub m:val="&#45;-"/>
     <m:smallFrac m:val="off"/>
     <m:dispDef/>
     <m:lMargin m:val="0"/>
     <m:rMargin m:val="0"/>
     <m:defJc m:val="centerGroup"/>
     <m:wrapIndent m:val="1440"/>
     <m:intLim m:val="subSup"/>
     <m:naryLim m:val="undOvr"/>
    </m:mathPr></w:WordDocument>
  </xml><![endif]--><!--[if gte mso 9]><xml>
   <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="false"
    DefSemiHidden="false" DefQFormat="false" DefPriority="99"
    LatentStyleCount="376">
    <w:LsdException Locked="false" Priority="0" QFormat="true" Name="Normal"/>
    <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 1"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 2"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 3"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 4"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 5"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 6"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 7"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 8"/>
    <w:LsdException Locked="false" Priority="9" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="heading 9"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 5"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 6"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 7"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 8"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index 9"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 1"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 2"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 3"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 4"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 5"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 6"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 7"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 8"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" Name="toc 9"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Normal Indent"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="footnote text"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="annotation text"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="header"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="footer"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="index heading"/>
    <w:LsdException Locked="false" Priority="35" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="caption"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="table of figures"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="envelope address"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="envelope return"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="footnote reference"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="annotation reference"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="line number"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="page number"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="endnote reference"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="endnote text"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="table of authorities"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="macro"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="toa heading"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Bullet"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Number"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List 5"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Bullet 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Bullet 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Bullet 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Bullet 5"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Number 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Number 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Number 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Number 5"/>
    <w:LsdException Locked="false" Priority="10" QFormat="true" Name="Title"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Closing"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Signature"/>
    <w:LsdException Locked="false" Priority="1" SemiHidden="true"
     UnhideWhenUsed="true" Name="Default Paragraph Font"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text Indent"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Continue"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Continue 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Continue 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Continue 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="List Continue 5"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Message Header"/>
    <w:LsdException Locked="false" Priority="11" QFormat="true" Name="Subtitle"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Salutation"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Date"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text First Indent"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text First Indent 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Note Heading"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text Indent 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Body Text Indent 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Block Text"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Hyperlink"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="FollowedHyperlink"/>
    <w:LsdException Locked="false" Priority="22" QFormat="true" Name="Strong"/>
    <w:LsdException Locked="false" Priority="20" QFormat="true" Name="Emphasis"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Document Map"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Plain Text"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="E-mail Signature"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Top of Form"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Bottom of Form"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Normal (Web)"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Acronym"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Address"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Cite"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Code"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Definition"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Keyboard"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Preformatted"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Sample"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Typewriter"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="HTML Variable"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Normal Table"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="annotation subject"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="No List"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Outline List 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Outline List 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Outline List 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Simple 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Simple 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Simple 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Classic 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Classic 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Classic 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Classic 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Colorful 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Colorful 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Colorful 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Columns 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Columns 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Columns 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Columns 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Columns 5"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 5"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 6"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 7"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Grid 8"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 4"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 5"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 6"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 7"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table List 8"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table 3D effects 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table 3D effects 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table 3D effects 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Contemporary"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Elegant"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Professional"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Subtle 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Subtle 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Web 1"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Web 2"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Web 3"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Balloon Text"/>
    <w:LsdException Locked="false" Priority="39" Name="Table Grid"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Table Theme"/>
    <w:LsdException Locked="false" SemiHidden="true" Name="Placeholder Text"/>
    <w:LsdException Locked="false" Priority="1" QFormat="true" Name="No Spacing"/>
    <w:LsdException Locked="false" Priority="60" Name="Light Shading"/>
    <w:LsdException Locked="false" Priority="61" Name="Light List"/>
    <w:LsdException Locked="false" Priority="62" Name="Light Grid"/>
    <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1"/>
    <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2"/>
    <w:LsdException Locked="false" Priority="65" Name="Medium List 1"/>
    <w:LsdException Locked="false" Priority="66" Name="Medium List 2"/>
    <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1"/>
    <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2"/>
    <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3"/>
    <w:LsdException Locked="false" Priority="70" Name="Dark List"/>
    <w:LsdException Locked="false" Priority="71" Name="Colorful Shading"/>
    <w:LsdException Locked="false" Priority="72" Name="Colorful List"/>
    <w:LsdException Locked="false" Priority="73" Name="Colorful Grid"/>
    <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 1"/>
    <w:LsdException Locked="false" Priority="61" Name="Light List Accent 1"/>
    <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 1"/>
    <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 1"/>
    <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 1"/>
    <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 1"/>
    <w:LsdException Locked="false" SemiHidden="true" Name="Revision"/>
    <w:LsdException Locked="false" Priority="34" QFormat="true"
     Name="List Paragraph"/>
    <w:LsdException Locked="false" Priority="29" QFormat="true" Name="Quote"/>
    <w:LsdException Locked="false" Priority="30" QFormat="true"
     Name="Intense Quote"/>
    <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 1"/>
    <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 1"/>
    <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 1"/>
    <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 1"/>
    <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 1"/>
    <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 1"/>
    <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 1"/>
    <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 1"/>
    <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 2"/>
    <w:LsdException Locked="false" Priority="61" Name="Light List Accent 2"/>
    <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 2"/>
    <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 2"/>
    <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 2"/>
    <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 2"/>
    <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 2"/>
    <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 2"/>
    <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 2"/>
    <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 2"/>
    <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 2"/>
    <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 2"/>
    <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 2"/>
    <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 2"/>
    <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 3"/>
    <w:LsdException Locked="false" Priority="61" Name="Light List Accent 3"/>
    <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 3"/>
    <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 3"/>
    <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 3"/>
    <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 3"/>
    <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 3"/>
    <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 3"/>
    <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 3"/>
    <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 3"/>
    <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 3"/>
    <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 3"/>
    <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 3"/>
    <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 3"/>
    <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 4"/>
    <w:LsdException Locked="false" Priority="61" Name="Light List Accent 4"/>
    <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 4"/>
    <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 4"/>
    <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 4"/>
    <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 4"/>
    <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 4"/>
    <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 4"/>
    <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 4"/>
    <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 4"/>
    <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 4"/>
    <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 4"/>
    <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 4"/>
    <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 4"/>
    <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 5"/>
    <w:LsdException Locked="false" Priority="61" Name="Light List Accent 5"/>
    <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 5"/>
    <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 5"/>
    <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 5"/>
    <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 5"/>
    <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 5"/>
    <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 5"/>
    <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 5"/>
    <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 5"/>
    <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 5"/>
    <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 5"/>
    <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 5"/>
    <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 5"/>
    <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 6"/>
    <w:LsdException Locked="false" Priority="61" Name="Light List Accent 6"/>
    <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 6"/>
    <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 6"/>
    <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 6"/>
    <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 6"/>
    <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 6"/>
    <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 6"/>
    <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 6"/>
    <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 6"/>
    <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 6"/>
    <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 6"/>
    <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 6"/>
    <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 6"/>
    <w:LsdException Locked="false" Priority="19" QFormat="true"
     Name="Subtle Emphasis"/>
    <w:LsdException Locked="false" Priority="21" QFormat="true"
     Name="Intense Emphasis"/>
    <w:LsdException Locked="false" Priority="31" QFormat="true"
     Name="Subtle Reference"/>
    <w:LsdException Locked="false" Priority="32" QFormat="true"
     Name="Intense Reference"/>
    <w:LsdException Locked="false" Priority="33" QFormat="true" Name="Book Title"/>
    <w:LsdException Locked="false" Priority="37" SemiHidden="true"
     UnhideWhenUsed="true" Name="Bibliography"/>
    <w:LsdException Locked="false" Priority="39" SemiHidden="true"
     UnhideWhenUsed="true" QFormat="true" Name="TOC Heading"/>
    <w:LsdException Locked="false" Priority="41" Name="Plain Table 1"/>
    <w:LsdException Locked="false" Priority="42" Name="Plain Table 2"/>
    <w:LsdException Locked="false" Priority="43" Name="Plain Table 3"/>
    <w:LsdException Locked="false" Priority="44" Name="Plain Table 4"/>
    <w:LsdException Locked="false" Priority="45" Name="Plain Table 5"/>
    <w:LsdException Locked="false" Priority="40" Name="Grid Table Light"/>
    <w:LsdException Locked="false" Priority="46" Name="Grid Table 1 Light"/>
    <w:LsdException Locked="false" Priority="47" Name="Grid Table 2"/>
    <w:LsdException Locked="false" Priority="48" Name="Grid Table 3"/>
    <w:LsdException Locked="false" Priority="49" Name="Grid Table 4"/>
    <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark"/>
    <w:LsdException Locked="false" Priority="51" Name="Grid Table 6 Colorful"/>
    <w:LsdException Locked="false" Priority="52" Name="Grid Table 7 Colorful"/>
    <w:LsdException Locked="false" Priority="46"
     Name="Grid Table 1 Light Accent 1"/>
    <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 1"/>
    <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 1"/>
    <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 1"/>
    <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 1"/>
    <w:LsdException Locked="false" Priority="51"
     Name="Grid Table 6 Colorful Accent 1"/>
    <w:LsdException Locked="false" Priority="52"
     Name="Grid Table 7 Colorful Accent 1"/>
    <w:LsdException Locked="false" Priority="46"
     Name="Grid Table 1 Light Accent 2"/>
    <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 2"/>
    <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 2"/>
    <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 2"/>
    <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 2"/>
    <w:LsdException Locked="false" Priority="51"
     Name="Grid Table 6 Colorful Accent 2"/>
    <w:LsdException Locked="false" Priority="52"
     Name="Grid Table 7 Colorful Accent 2"/>
    <w:LsdException Locked="false" Priority="46"
     Name="Grid Table 1 Light Accent 3"/>
    <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 3"/>
    <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 3"/>
    <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 3"/>
    <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 3"/>
    <w:LsdException Locked="false" Priority="51"
     Name="Grid Table 6 Colorful Accent 3"/>
    <w:LsdException Locked="false" Priority="52"
     Name="Grid Table 7 Colorful Accent 3"/>
    <w:LsdException Locked="false" Priority="46"
     Name="Grid Table 1 Light Accent 4"/>
    <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 4"/>
    <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 4"/>
    <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 4"/>
    <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 4"/>
    <w:LsdException Locked="false" Priority="51"
     Name="Grid Table 6 Colorful Accent 4"/>
    <w:LsdException Locked="false" Priority="52"
     Name="Grid Table 7 Colorful Accent 4"/>
    <w:LsdException Locked="false" Priority="46"
     Name="Grid Table 1 Light Accent 5"/>
    <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 5"/>
    <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 5"/>
    <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 5"/>
    <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 5"/>
    <w:LsdException Locked="false" Priority="51"
     Name="Grid Table 6 Colorful Accent 5"/>
    <w:LsdException Locked="false" Priority="52"
     Name="Grid Table 7 Colorful Accent 5"/>
    <w:LsdException Locked="false" Priority="46"
     Name="Grid Table 1 Light Accent 6"/>
    <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 6"/>
    <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 6"/>
    <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 6"/>
    <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 6"/>
    <w:LsdException Locked="false" Priority="51"
     Name="Grid Table 6 Colorful Accent 6"/>
    <w:LsdException Locked="false" Priority="52"
     Name="Grid Table 7 Colorful Accent 6"/>
    <w:LsdException Locked="false" Priority="46" Name="List Table 1 Light"/>
    <w:LsdException Locked="false" Priority="47" Name="List Table 2"/>
    <w:LsdException Locked="false" Priority="48" Name="List Table 3"/>
    <w:LsdException Locked="false" Priority="49" Name="List Table 4"/>
    <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark"/>
    <w:LsdException Locked="false" Priority="51" Name="List Table 6 Colorful"/>
    <w:LsdException Locked="false" Priority="52" Name="List Table 7 Colorful"/>
    <w:LsdException Locked="false" Priority="46"
     Name="List Table 1 Light Accent 1"/>
    <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 1"/>
    <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 1"/>
    <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 1"/>
    <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 1"/>
    <w:LsdException Locked="false" Priority="51"
     Name="List Table 6 Colorful Accent 1"/>
    <w:LsdException Locked="false" Priority="52"
     Name="List Table 7 Colorful Accent 1"/>
    <w:LsdException Locked="false" Priority="46"
     Name="List Table 1 Light Accent 2"/>
    <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 2"/>
    <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 2"/>
    <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 2"/>
    <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 2"/>
    <w:LsdException Locked="false" Priority="51"
     Name="List Table 6 Colorful Accent 2"/>
    <w:LsdException Locked="false" Priority="52"
     Name="List Table 7 Colorful Accent 2"/>
    <w:LsdException Locked="false" Priority="46"
     Name="List Table 1 Light Accent 3"/>
    <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 3"/>
    <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 3"/>
    <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 3"/>
    <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 3"/>
    <w:LsdException Locked="false" Priority="51"
     Name="List Table 6 Colorful Accent 3"/>
    <w:LsdException Locked="false" Priority="52"
     Name="List Table 7 Colorful Accent 3"/>
    <w:LsdException Locked="false" Priority="46"
     Name="List Table 1 Light Accent 4"/>
    <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 4"/>
    <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 4"/>
    <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 4"/>
    <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 4"/>
    <w:LsdException Locked="false" Priority="51"
     Name="List Table 6 Colorful Accent 4"/>
    <w:LsdException Locked="false" Priority="52"
     Name="List Table 7 Colorful Accent 4"/>
    <w:LsdException Locked="false" Priority="46"
     Name="List Table 1 Light Accent 5"/>
    <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 5"/>
    <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 5"/>
    <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 5"/>
    <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 5"/>
    <w:LsdException Locked="false" Priority="51"
     Name="List Table 6 Colorful Accent 5"/>
    <w:LsdException Locked="false" Priority="52"
     Name="List Table 7 Colorful Accent 5"/>
    <w:LsdException Locked="false" Priority="46"
     Name="List Table 1 Light Accent 6"/>
    <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 6"/>
    <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 6"/>
    <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 6"/>
    <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 6"/>
    <w:LsdException Locked="false" Priority="51"
     Name="List Table 6 Colorful Accent 6"/>
    <w:LsdException Locked="false" Priority="52"
     Name="List Table 7 Colorful Accent 6"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Mention"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Smart Hyperlink"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Hashtag"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Unresolved Mention"/>
    <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
     Name="Smart Link"/>
   </w:LatentStyles>
  </xml><![endif]-->
  <style>
  <!--
   /* Font Definitions */
   @font-face
    {font-family:"Cambria Math";
    panose-1:2 4 5 3 5 4 6 3 2 4;
    mso-font-charset:0;
    mso-generic-font-family:roman;
    mso-font-pitch:variable;
    mso-font-signature:-536870145 1107305727 0 0 415 0;}
  @font-face
    {font-family:Georgia;
    panose-1:2 4 5 2 5 4 5 2 3 3;
    mso-font-charset:0;
    mso-generic-font-family:roman;
    mso-font-pitch:variable;
    mso-font-signature:647 0 0 0 159 0;}
   /* Style Definitions */
   p.MsoNormal, li.MsoNormal, div.MsoNormal
    {mso-style-unhide:no;
    mso-style-qformat:yes;
    mso-style-parent:"";
    margin:0cm;
    mso-pagination:widow-orphan;
    font-size:12.0pt;
    font-family:"Times New Roman",serif;
    mso-fareast-font-family:"Times New Roman";}
  h1
    {mso-style-priority:9;
    mso-style-unhide:no;
    mso-style-qformat:yes;
    mso-style-link:"Título 1 Car";
    mso-margin-top-alt:auto;
    margin-right:0cm;
    mso-margin-bottom-alt:auto;
    margin-left:0cm;
    mso-pagination:widow-orphan;
    mso-outline-level:1;
    font-size:24.0pt;
    font-family:"Times New Roman",serif;
    font-weight:bold;}
  h2
    {mso-style-noshow:yes;
    mso-style-priority:9;
    mso-style-qformat:yes;
    mso-style-next:Normal;
    margin-top:18.0pt;
    margin-right:0cm;
    margin-bottom:4.0pt;
    margin-left:0cm;
    mso-pagination:widow-orphan lines-together;
    page-break-after:avoid;
    mso-outline-level:2;
    font-size:18.0pt;
    font-family:"Times New Roman",serif;
    font-weight:bold;
    mso-bidi-font-weight:normal;}
  h3
    {mso-style-noshow:yes;
    mso-style-priority:9;
    mso-style-qformat:yes;
    mso-style-next:Normal;
    margin-top:14.0pt;
    margin-right:0cm;
    margin-bottom:4.0pt;
    margin-left:0cm;
    mso-pagination:widow-orphan lines-together;
    page-break-after:avoid;
    mso-outline-level:3;
    font-size:14.0pt;
    font-family:"Times New Roman",serif;
    font-weight:bold;
    mso-bidi-font-weight:normal;}
  h4
    {mso-style-noshow:yes;
    mso-style-priority:9;
    mso-style-qformat:yes;
    mso-style-next:Normal;
    margin-top:12.0pt;
    margin-right:0cm;
    margin-bottom:2.0pt;
    margin-left:0cm;
    mso-pagination:widow-orphan lines-together;
    page-break-after:avoid;
    mso-outline-level:4;
    font-size:12.0pt;
    font-family:"Times New Roman",serif;
    font-weight:bold;
    mso-bidi-font-weight:normal;}
  h5
    {mso-style-noshow:yes;
    mso-style-priority:9;
    mso-style-qformat:yes;
    mso-style-next:Normal;
    margin-top:11.0pt;
    margin-right:0cm;
    margin-bottom:2.0pt;
    margin-left:0cm;
    mso-pagination:widow-orphan lines-together;
    page-break-after:avoid;
    mso-outline-level:5;
    font-size:11.0pt;
    font-family:"Times New Roman",serif;
    font-weight:bold;
    mso-bidi-font-weight:normal;}
  h6
    {mso-style-noshow:yes;
    mso-style-priority:9;
    mso-style-qformat:yes;
    mso-style-next:Normal;
    margin-top:10.0pt;
    margin-right:0cm;
    margin-bottom:2.0pt;
    margin-left:0cm;
    mso-pagination:widow-orphan lines-together;
    page-break-after:avoid;
    mso-outline-level:6;
    font-size:10.0pt;
    font-family:"Times New Roman",serif;
    font-weight:bold;
    mso-bidi-font-weight:normal;}
  p.MsoTitle, li.MsoTitle, div.MsoTitle
    {mso-style-priority:10;
    mso-style-unhide:no;
    mso-style-qformat:yes;
    mso-style-next:Normal;
    margin-top:24.0pt;
    margin-right:0cm;
    margin-bottom:6.0pt;
    margin-left:0cm;
    mso-pagination:widow-orphan lines-together;
    page-break-after:avoid;
    font-size:36.0pt;
    font-family:"Times New Roman",serif;
    mso-fareast-font-family:"Times New Roman";
    font-weight:bold;
    mso-bidi-font-weight:normal;}
  p.MsoSubtitle, li.MsoSubtitle, div.MsoSubtitle
    {mso-style-priority:11;
    mso-style-unhide:no;
    mso-style-qformat:yes;
    mso-style-next:Normal;
    margin-top:18.0pt;
    margin-right:0cm;
    margin-bottom:4.0pt;
    margin-left:0cm;
    mso-pagination:widow-orphan lines-together;
    page-break-after:avoid;
    font-size:24.0pt;
    font-family:"Georgia",serif;
    mso-fareast-font-family:Georgia;
    mso-bidi-font-family:Georgia;
    color:#666666;
    font-style:italic;
    mso-bidi-font-style:normal;}
  a:link, span.MsoHyperlink
    {mso-style-priority:99;
    color:blue;
    text-decoration:underline;
    text-underline:single;}
  a:visited, span.MsoHyperlinkFollowed
    {mso-style-noshow:yes;
    mso-style-priority:99;
    color:#954F72;
    mso-themecolor:followedhyperlink;
    text-decoration:underline;
    text-underline:single;}
  p
    {mso-style-priority:99;
    mso-margin-top-alt:auto;
    margin-right:0cm;
    mso-margin-bottom-alt:auto;
    margin-left:0cm;
    mso-pagination:widow-orphan;
    font-size:12.0pt;
    font-family:"Times New Roman",serif;
    mso-fareast-font-family:"Times New Roman";}
  span.Ttulo1Car
    {mso-style-name:"Título 1 Car";
    mso-style-priority:9;
    mso-style-unhide:no;
    mso-style-locked:yes;
    mso-style-link:"Título 1";
    mso-ansi-font-size:24.0pt;
    mso-bidi-font-size:24.0pt;
    font-family:"Times New Roman",serif;
    mso-ascii-font-family:"Times New Roman";
    mso-fareast-font-family:"Times New Roman";
    mso-hansi-font-family:"Times New Roman";
    mso-bidi-font-family:"Times New Roman";
    mso-font-kerning:18.0pt;
    mso-fareast-language:ES-TRAD;
    font-weight:bold;}
  span.apple-converted-space
    {mso-style-name:apple-converted-space;
    mso-style-unhide:no;}
  .MsoChpDefault
    {mso-style-type:export-only;
    mso-default-props:yes;
    mso-font-kerning:0pt;
    mso-ligatures:none;}
  @page WordSection1
    {size:612.0pt 792.0pt;
    margin:36.0pt 36.0pt 36.0pt 36.0pt;
    mso-header-margin:35.4pt;
    mso-footer-margin:35.4pt;
    mso-page-numbers:1;
    mso-paper-source:0;}
  div.WordSection1
    {page:WordSection1;}
  -->
  </style>
  <!--[if gte mso 10]>
  <style>
   /* Style Definitions */
   table.MsoNormalTable
    {mso-style-name:"Tabla normal";
    mso-tstyle-rowband-size:0;
    mso-tstyle-colband-size:0;
    mso-style-noshow:yes;
    mso-style-priority:99;
    mso-style-parent:"";
    mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
    mso-para-margin:0cm;
    mso-pagination:widow-orphan;
    font-size:12.0pt;
    font-family:"Times New Roman",serif;}
  table.TableNormal
    {mso-style-name:"Table Normal";
    mso-tstyle-rowband-size:0;
    mso-tstyle-colband-size:0;
    mso-style-unhide:no;
    mso-style-parent:"";
    mso-padding-alt:0cm 0cm 0cm 0cm;
    mso-para-margin:0cm;
    mso-pagination:widow-orphan;
    font-size:12.0pt;
    font-family:"Times New Roman",serif;}
  </style>
  <![endif]-->
  </head>
  
  <body lang="ES-AR" link="blue" vlink="#954F72" style="tab-interval:36.0pt;
  word-wrap:break-word">
  
  <div class="WordSection1">
  
  <p class="MsoNormal" align="center" style="margin-bottom:14.0pt;text-align:center;
  line-height:115%;border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;
  mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y CONDICIONES PARA EL USUARIO: INTRODUCCIÓN: <o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%"><i style="mso-bidi-font-style:normal"><span style="color:black">BILLETE </span></i><span style="color:black">GLOBAL INC, Delaware Corporation, Address 251 Little Falls
  Dr, Wilmington, DE 19808 (“la Empresa”), sociedad constituida y registrada en
  Estados Unidos <i style="mso-bidi-font-style:normal">SE LIMITA A OPERAR COMO
  PROVEEDOR DE SERVICIOS BITCOIN Y PROVEEDOR DE SERVICIOS ACTIVOS DIGITALES COMO:
  Custodio de Criptomonedas y Activos Digitales, Casas de Intercambio Digital o
  Exchange, Billetera Digital y Procesador de Pago DE CONFORMIDAD CON LA LEGISLACIÓN
  DE ESTADOS UNIDOS. </i></span>Los servicios provistos por la empresa podrán ser
  ejecutados por proveedores que la empresa designe a su discreción de acuerdo a
  las leyes de los países en los que opera.<span style="color:black"><o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">Los Términos y Condiciones (“TyC”) rigen para las
  operaciones que realicen los usuarios habilitados (los “Usuarios”) con la
  plataforma ofrecidas por BILLETE GLOBAL INC (en “la Empresa”), sociedad
  constituida y registrada en Estados Unidos, </span>y a los proveedores que la
  empresa designa a su discreción de acuerdo a las leyes de los países en los que
  opera<span style="color:black">. También serán de aplicación para todas las
  promociones de productos, en lo que resulten de aplicación, y se encuentran
  disponibles en la página web (https://www.billete.io), junto con las Políticas
  de Privacida</span>d <span style="color:black">y Políticas de Cookies de la
  Compañía. Al hacer clic en “aceptar” los TyC en la Plataforma, el Usuario
  reconoce que ha leído y entendido los mismos en su totalidad, que ha aceptado
  su contenido y que estos TyC constituyen un acuerdo vinculante entre el Usuario
  y la Empresa.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Actualización de
  los Términos y condiciones:</u> </b>La Empresa se reserva el derecho de revisar
  estos TyC en cualquier momento, actualizando y/o modificándolos. Cualquier
  actualización en nuestras políticas será informada a los usuarios. El Usuario
  deberá leer atentamente los Términos y Condiciones y sus modificaciones. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Vigencia de los
  Términos y condiciones:</u> </b>Todos los términos modificados entrarán en
  vigor desde el momento de su publicación y se presumirán aceptados por el
  Usuario, que será notificado de las modificaciones y permitirá a la Empresa
  registrar dichas aceptaciones. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3) <u>Disconformidad
  del usuario:</u></span></b><span style="color:black"> Cualquier disconformidad
  o duda podrá ser resuelta en los canales de comunicación oficiales. En caso de
  disconformidad por parte del Usuario, la Empresa procederá al cierre de la
  Cuenta del Usuario previa solicitud de&nbsp; instrucción al Usuario sobre el
  destino a dar a cualquier tipo de Activos Digitales registrados en su Cuenta;
  hasta tanto la Empresa no reciba dicha órden, la Cuenta permanecerá bloqueada.<b style="mso-bidi-font-weight:normal"><u><o:p></o:p></u></b></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">4)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Definiciones:</u></b>
  <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">a) "Activo Digital": Es cualquier activo que sea
  ofrecido por la Plataforma actualmente o en el futuro, incluyendo
  criptoactivos.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">b) "Billetera” (Wallet): Es una aplicación de software
  u otro mecanismo, cuya finalidad es&nbsp;la custodia y transferencia de Activos
  Digitales.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">c) "Cuenta": Es el registro en la Plataforma
  mediante el cual se identifica a cada Usuario y sus operaciones.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">d) "Conversión":&nbsp;Es la Conversión interna
  automatizada ordenada por el Titular de la Cuenta y llevada a cabo por la
  Empresa para convertir Activos Digitales por otro u otros.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">e) "Plataforma": Es la Aplicación disponible para
  su descarga a través de la página web<b style="mso-bidi-font-weight:normal"> </b>oficial,
  Appstore y PlayStore o la que en el futuro así lo ofrezca.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">f) "Servicios": Son los servicios ofrecidos a los
  Usuarios por la Plataforma que incluyen la compra, venta, canje, permuta, y la
  custodia Activos Digitales que en el futuro se habiliten en su Billetera.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">g) "Usuario": Es la una persona física, mayor de
  edad y plenamente capaz, de acuerdo con la legislación vigente de la
  jurisdicción de su domicilio, que acepta los TyC con la finalidad de ser
  Titular de una Cuenta en la Plataforma y utilizar los Servicios ofrecidos por
  la misma conforme los presentes TyC.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">h) “Airdrop”: refiere a un procedimiento de distribución de
  nuevos tokens o criptomonedas o los ya existentes otorgados a poseedores de
  Activos Digitales.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" align="center" style="margin-top:14.0pt;margin-right:0cm;
  margin-bottom:14.0pt;margin-left:0cm;text-align:center;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO I: CUENTA Y JURISDICCIONES. <o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1) <u>Alta de
  Cuenta en la Plataforma:</u></span></b><span style="color:black"> El usuario
  proporcionará información </span>veraz<span style="color:black"> y precisa, en
  carácter de declaración jurada, para la apertura de la cuenta en la Plataforma.
  La Empresa podrá solicitarle información complementaria para continuar
  operando, y en caso de disconformidad se aplicará el procedimiento
  correspondiente. El Usuario se compromete a mantener actualizada, la totalidad
  de la información solicitada y será el único responsable por los daños que la
  falta de dicha actualización pueda ocasionar. Cada Usuario podrá ser únicamente
  titular de una Cuenta en la Plataforma.&nbsp;En lo relativo a los datos
  personales, se encuentra disponible en los canales oficiales la declaración de
  privacidad.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Jurisdicciones
  restringidas:</u></b> Las siguientes jurisdicciones se encuentran restringidas
  para el uso de la Plataforma: Argelia, Bangladesh, Bielorrusia, Birmania,
  Burundi, República Centroafricana, Corea del Norte, Costa de Marfil, Crimea,
  Cuba, República Democrática del Congo, Hong Kong, Irán, Irak, Kazajistán,
  Líbano, Libia, Liberia, Mali, Nicaragua, Nepal, Palestina, Qatar, Rusia,
  Somalia, Sudán y Darfur, Sudán del Sur, Siria, Ucrania, Vanuatu, Vietnam,
  Yemen, Zimbabue.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2.1) </span></b><span style="color:black">Las anteriores son consideradas por la Empresa como
  jurisdicciones en las que nos reservamos el derecho a prestar nuestros
  servicios, ya sea porque son de alto riesgo, o porque cuentan con medidas
  débiles para la prevención del lavado de dinero y el financiamiento al
  terrorismo o porque que tienen deficiencias estratégicas de acuerdo con
  estándares internacionales o locales en estas materias de PLD/FT.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2.2) <u>Derecho
  de admisión:</u> </span></b><span style="color:black">La Empresa se reserva el
  derecho de rechazar el registro de una Cuenta, a personas cuyas nacionalidad,
  ciudadanía o ubicación sea de las antedichas. La Empresa se reserva el derecho
  de rechazar el registro de una nueva Cuenta, a su entera discreción y/o en
  virtud de la normativa aplicable.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Acceso a Cuenta:</u></b>
  El Usuario accederá a su Cuenta mediante el ingreso de su dirección de e-mail o
  tel</span>éfono<span style="color:black"> y clave de seguridad personal elegida
  ("Clave de Ingreso" </span>o “Contraseña”<span style="color:black">).
  El Usuario se obliga a mantener la confidencialidad de su Clave de Ingreso. La </span>Empresa
  podrá enviarle un “SMS” al usuario para verificar su número telefónico.<span style="color:black"> En virtud de ello, el Usuario será el único y exclusivo
  responsable por todas las operaciones efectuadas en su Cuenta. El Usuario se
  compromete a notificar en forma inmediata y por medio idóneo y fehaciente, de
  cualquier uso no autorizado de su Cuenta, así como del ingreso o de intentos de
  ingreso por terceros no autorizados a la misma. En caso de perder su clave de
  ingreso, el Usuario deberá enviar un correo electrónico desde la casilla que
  utilizó para registrarse a un canal de comunicación oficial.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">Desde el correo electrónico </span>“no-reply@billete.io” o
  desde la aplicación al momento de acceder a su cuenta<span style="color:black">,
  le </span>enviarán<span style="color:black"> las instrucciones para blanquear
  sus credenciales, consistentes en enviar una prueba como imágenes o
  video-selfie donde sostenga su DNI y en el que diga textualmente lo que</span>
  la Empresa disponga para verificar su identidad<span style="color:black">. La
  operatoria descripta y el material enviado será tratado conforme lo dispuesto
  por la Declaración de Privacidad de la Empresa,&nbsp;y utilizado únicamente con
  el fin de verificar la identidad del usuario y proteger tanto el acceso a su
  cuenta como los activos que posea.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3.1)</span></b><span style="color:black"> Al momento de su registración el Usuario debe denunciar un
  correo electrónico personal o tel</span>éfono <span style="color:black">para su
  identificación. <a name="bookmark=id.30j0zll"></a><a name="bookmark=id.gjdgxs"></a>Para
  prevenir fraudes la empresa no permite la registración de Usuarios con correos
  que contengan las palabras “Administrador”, “Administradores”, “Presidente”,
  “Billete”, “Billetes”, “Sorteo”, “Sorteos”, “Socio”, “Socios”, “Gestor”,
  “Gestores”, “Premio”, “Premios”, “Ganador”, “Ganadores”, “Concurso”,
  “Concursos”, “Recompensa”, “Recompensas”. Esta lista es meramente enunciativa y
  no taxativa.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3.2)</span></b><span style="color:black"> Los usuarios cuentan con Double Factor Authentication como
  elemento de seguridad para sus transacciones. Antes de ejecutar una
  transferencia</span>,<span style="color:black"> transacci</span>ón y<span style="color:black"> para el inicio de sesión o registro, la plataforma les
  solicitará un código que se mandará por SMS al teléfono registrado en la
  aplicación</span>. También puede adicionarse el servicio de autenticación
  “Google Authenticator”.<span style="color:black"><o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3.3)</span></b><span style="color:black"> Se permitirá la apertura de un tipo de Cuenta: “Cuenta
  Personal”, disponible por defecto para cualquier persona que se registre en la
  Plataforma, siempre que se cumplan los requerimientos correspondientes.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3.4)</span></b><span style="color:black"> El Usuario se compromete a informar a la Empresa de
  cualquier cambio que se produzca en su Documento de Identidad (DNI), a fin de
  poder ser identificado correctamente y actualizar dicha información en la
  Plataforma para permitir que continúe operando normalmente. A fin de actualizar
  la información resulta indispensable que el Usuario ya cuente con su Documento
  de Identidad modificado y posteriormente lo informe a la casilla de correo
  electrónico&nbsp;oficial.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3.5)</span></b><span style="color:black"> En caso de cambio de dispositivo, previo a operar, deberá
  validar su identidad con las pruebas que le sea solicitada por la Empresa </span>y
  por el método que disponga la Billetera Digital o el Sitio Web<span style="color:black">. Una vez habilitado el nuevo dispositivo podrá operar con
  normalidad.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" align="center" style="margin-top:14.0pt;margin-right:0cm;
  margin-bottom:14.0pt;margin-left:0cm;text-align:center;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO II: SERVICIOS DE LA PLATAFORMA. <o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">1<span style="color:black">)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Servicios de
  intercambio:</u></b> La Plataforma está destinada a ofrecer el servicio de
  compra y venta de activos digitales, cuyos precios se encuentran establecidos
  por el proveedor. Se hace saber que los Activos Digitales son susceptibles de
  ser comprados o vendidos en la Plataforma y se encuentran taxativamente
  enunciados en la misma Plataforma. Sin perjuicio de ello, la Empresa podrá
  ofrecer </span>otros servicios, como los enunciados en “TÉRMINOS Y CONDICIONES
  PARA EL USUARIO: CAPÍTULO V.- ÓRDENES”.</p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">1.2<span style="color:black">)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Activos
  Digitales futuros:</u> </b>Bajo exclusiva voluntad de la Empresa, podrán
  agregarse otros activos digitales adicionales, así como también, dejar de
  soportar uno o más de los actualmente ofrecidos, si se estimara conveniente. En
  ningún supuesto la Empresa será obligada a agregar o dejar de soportar activos
  digitales.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">1.3<span style="color:black">)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Operaciones:</u></b>
  Los Usuarios utilizarán los Servicios en la Plataforma&nbsp;emitiendo las
  órdenes para compra, venta, canje, permuta&nbsp;y la custodia de Activos
  Digitales a través de la misma (la “Órden”).<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">1.4<span style="color:black">) </span></b><span style="color:black">Al emitir una Órden, el Usuario acepta que una vez
  ejecutada la misma a través de la Plataforma, dicha transacción<b style="mso-bidi-font-weight:normal">&nbsp;<u>es irreversible y no se puede
  cancelar.</u></b> Ello sólo será posible antes de que se ejecute o cuando
  hubiese una modificación en el precio dentro de los intervalos de tiempo por
  cualquier motivo.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">1.5<span style="color:black">)</span></b><span style="color:black"> La Empresa puede establecer montos mínimos y/o máximos
  para las órdenes con Activos Digitales, los que se consultan en la Plataforma
  al momento de emitirla.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">1.6<span style="color:black">)</span></b><span style="color:black"> El Usuario acepta que al emitir una Órden es el único
  responsable de determinar si dicha transacción es adecuada conforme a su
  situación financiera, capacidad patrimonial y/o su tolerancia al riesgo, y que
  ha leído y comprende los riesgos que involucra efectuar transacciones con
  Activos Digitales. El Usuario reconoce que todas las Órdenes que emite lo son
  bajo su exclusivo criterio y a su propio riesgo.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">2<span style="color:black">) <u>Derecho de
  reserva de ejecución de órdenes:</u></span></b><span style="color:black"> a
  Empresa se reserva el derecho de no ejecutar Órdenes en los siguientes casos: <b style="mso-bidi-font-weight:normal">(a)</b> La Órden es contraria a los
  presentes TyC, las leyes, regulaciones, normas o políticas de La Empresa, o
  implica la comisión de cualquier acto ilícito tales como lavado de activos o
  financiamiento del terrorismo, fraude, estafa o defraudación. Estas actividades
  son solos enunciativas y no constituyen supuestos taxativos; <b style="mso-bidi-font-weight:normal">(b)</b> una interrupción o falla técnica en
  los Servicios o un cierre prematuro de operaciones; <b style="mso-bidi-font-weight:
  normal">(c)</b> fuerza mayor, caso fortuito, guerra (declarada o no declarada),
  terrorismo, incendio o decisión&nbsp;por parte de una plataforma o proveedor de
  servicios de Activos Digitales, autoridad reguladora o gubernamental que
  prohíba, interrumpa, restrinja, altere las condiciones de uso y/o el comercio
  del Activo Digital correspondiente; y/o <b style="mso-bidi-font-weight:normal">(d)</b>
  violaciones de seguridad de la Plataforma.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">3<span style="color:black">) <u>Volatilidad:</u></span></b><span style="color:black"> El Usuario entiende y acepta que la Empresa no tiene
  ninguna incidencia tiene respecto a su valor</span>,<span style="color:black">
  volatilidad y características. Se aclara que el precio que aparece varía y
  puede diferir desde el momento en que se entra a la Plataforma hasta el momento
  en que se lleva a cabo la operación. El precio de las criptomonedas cambia con
  frecuencia en función de las condiciones del mercado. Considera el precio que
  aparece en la página de confirmación de la orden como cotización final.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">4<span style="color:black">) <u>Riesgos
  Asociados:</u></span></b><span style="color:black"> El Usuario comprende que
  las inversiones en Activos Digitales pueden implicar mayores riesgos que los
  asociados con otras inversiones tradicionales. La Empresa no brinda
  asesoramiento de ningún tipo, ni será responsable por pérdidas ocasionadas
  producto de la volatilidad o de la operatoria de los Activos Digitales.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">5<span style="color:black">)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Ausencia de
  Asesoría Financiera o Legal:</u></b> La Empresa no proporciona asesoría
  financiera, consejos de inversión o asistencia legal en relación con los
  Servicios. La Empresa puede proporcionar información sobre el precio, el rango,
  la volatilidad de los Activos Digitales y los eventos que han afectado el
  precio de los mismos, pero no debe considerarse dicha información como una
  asesoría de inversión o financiera y no debe interpretarse como tal. Cualquier
  notificación, Correo electrónico, Push, Publicación por redes sociales o
  cualquier funcionalidad, es sólo a los fines informativos. Cualquier decisión
  de comprar y/o vender Activos Digitales es una decisión del Usuario y la
  Empresa no será responsable por ninguna pérdida sufrida.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO III: COMISIONES y CONVERSIONES.<o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1)</span></b><span style="color:black"> Los siguientes servicios ofrecidos a través de la
  Plataforma están sujetos a Comisiones: compra activo digital, venta activo
  digital, swap activo digital,</span> y<span style="color:black"> retiro activo
  digital (compuesto por costo de red y comisión de servicio). El porcentaje o
  valor de la comisión cobrada por la empresa siempre se informará al Usuario en
  la Plataforma, previo al momento de realizar la operación. El <b style="mso-bidi-font-weight:normal">costo de red</b> es aquel que se paga para
  cubrir el costo de los nodos que procesan las transacciones. La <b style="mso-bidi-font-weight:normal">comisión de servicio</b> corresponde a la
  totalidad de costos operativos que conlleva la operación requerida. Dicha
  comisión será presupuestada en el momento de la transacción y estará sujeto a
  la fluctuación del mercado. </span>El<span style="color:black"> costo </span>de<span style="color:black"> la comisión de servicio será mostrado al usuario previo a
  la ejecución de la órden, y el </span>mismo incluye el costo de red<span style="color:black">. Al dar su consentimiento y confirmar la operación se </span>dará<span style="color:black"> el cumplimiento de</span>l<span style="color:black"> pago.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Órdenes</u></b>:
  Las distintas alternativas y posibilidades para la acreditación de fondos en
  Divisa Fiduciaria en la Cuenta de la </span>Billetera Digital<span style="color:black">, dependerá de la normativa aplicable de la Jurisdicción
  del Usuario y los medios de pago habilitados por la Plataforma. Las
  transacciones que el Usuario realice en la Plataforma podrán requerir la
  realización de Conversiones Automatizadas cuando se prestan ciertos Servicios o
  se opera con ciertos Activos Digitales, o de Divisas Fiduciarias de acuerdo con
  la jurisdicción desde donde opere el Usuario. Para la realización de las
  Conversiones automatizadas, se solicitará expresa conformidad al Usuario en la
  Plataforma y los resultados de la misma serán acreditados en la Cuenta del
  Usuario.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" align="center" style="margin-top:14.0pt;margin-right:0cm;
  margin-bottom:14.0pt;margin-left:0cm;text-align:center;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO IV.- LAVADO DE DINERO Y FINANCIAMIENTO
  DEL TERRORISMO.<o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1.-</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Alta de Cuenta
  en la Plataforma:</u></b> Para la apertura de la Cuenta en la Plataforma el
  Usuario deberá proporcionar con carácter de declaración jurada, toda la
  información solicitada de forma veraz, precisa y completa. El usuario se
  compromete a mantener actualizada, la totalidad de la información solicitada y
  será el único responsable por los daños que la falta de dicha actualización
  pueda ocasionar. Cada Usuario podrá ser únicamente titular de una Cuenta en la
  Plataforma.&nbsp;Al momento de </span>depositar<span style="color:black"> o </span>retirar<span style="color:black"> activos digitales, para realizar la operación el usuario
  visualizará el siguiente mensaje:<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">1) Es responsabilidad del usuario ingresar los impuestos
  correspondientes al país de su domicilio fiscal. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">2) El usuario garantiza que los fondos utilizados son
  lícitos, y no es persona expuesta </span>políticamente<span style="color:black">.
  <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">3) El usuario asegura que los fondos no son utilizados para
  financiar terrorismo ni lavado de dinero. El usuario realiza la operación bajo
  su responsabilidad de conocer la normativa vigente de la jurisdicción en la que
  opera.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;text-indent:35.4pt;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><b style="mso-bidi-font-weight:normal"><span style="color:black">2</span>)</b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Cargas fiscales</u>:
  </b>Cada Usuario será responsable por todas las obligaciones y cargas fiscales
  y/o legales&nbsp; que correspondan por sus operaciones efectuadas en la
  Plataforma, sin que pueda imputarse a la Empresa ningún tipo de responsabilidad
  derivada de los incumplimientos de los Usuarios. La Empresa no se
  responsabiliza por el efectivo cumplimiento de las obligaciones fiscales o
  impositivas establecidas por la ley vigente y/o cualquier otra obligación que
  surja por el uso de la Plataforma por parte de los Usuarios.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><b style="mso-bidi-font-weight:normal">3.- <u>Utilización de los Servicios en la
  Plataforma:</u></b> La Empresa se reserva el derecho de no ejecutar Órdenes en
  las siguientes circunstancias: <b style="mso-bidi-font-weight:normal">(A)</b>
  La Órden es contraria a los presentes TyC, las leyes, regulaciones, normas o
  políticas de La Empresa, o implica la comisión de cualquier acto ilícito,
  incluyendo pero no limitado a, lavado de activos o financiamiento del
  terrorismo, fraude, estafa o defraudación; <b style="mso-bidi-font-weight:normal">(B)</b>
  una interrupción o falla técnica en los Servicios o un cierre prematuro de
  operaciones; <b style="mso-bidi-font-weight:normal">(C)</b> fuerza mayor, caso
  fortuito, guerra (declarada o no declarada), terrorismo, incendio o
  decisión&nbsp; por parte de una plataforma o proveedor de servicios de Activos
  Digitales, autoridad reguladora o gubernamental que prohíba, interrumpa,
  restrinja, altere las condiciones de uso y/o el comercio del Activo Digital
  correspondiente; y/o <b style="mso-bidi-font-weight:normal">(D)</b> violaciones
  de seguridad de la Plataforma.</p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><b style="mso-bidi-font-weight:normal">4.- <u>Límites para compra y venta de
  activos digitales:</u> </b>La Empresa&nbsp; puede establecer límites mensuales
  y anuales para operar con el fin de mantener los estánderes para la prevención
  del lavado de dinero y el financiamiento al terrorismo (PLD/FT). En Billete,
  existen dos tipos de límites para operar: Compra de Activos Digitales y Venta
  de Activos Digitales, Depósitos y Retiros de Activos Digitales. El usuario
  tendrá la posibilidad de solicitar la ampliación de los límites cumpliendo los
  recaudos que La Empresa le solicite.</p>
  
  <p class="MsoNormal" style="margin-left:18.0pt;text-align:justify;line-height:
  115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-left:18.0pt;text-align:justify;line-height:
  115%"><u>-CUMPLIMIENTO DE OBLIGACIÓN LEGAL.</u> Utilizaremos sus datos
  personales si son necesarios para cumplir una obligación legal exigible. Tenga
  en cuenta que, además de la regulación propia del sector y la actividad,
  aplican aquí normas relacionadas con: Prevención de Lavado de Dinero y Financiamiento
  del Terrorismo, regímenes informativos en general, regímenes fiscales de
  recaudación y requerimientos de autoridades administrativas y/o judiciales,
  entre otras.</p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><u><o:p><span style="text-decoration:none">&nbsp;</span></o:p></u></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><u><o:p><span style="text-decoration:none">&nbsp;</span></o:p></u></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><b style="mso-bidi-font-weight:normal">5</b>)<b style="mso-bidi-font-weight:normal">
  <u>Monitoreo de operaciones:</u></b> Nos comprometemos a monitorear de forma
  continua las transacciones realizadas a través de nuestra plataforma. Cualquier
  actividad sospechosa o inusual será investigada y reportada a las autoridades
  competentes según lo exijan las leyes aplicables.</p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><b style="mso-bidi-font-weight:normal">6) <u>Reporte de Operaciones Sospechosas</u>:</b>
  En caso de identificar operaciones sospechosas, nos comprometemos a informar de
  inmediato a las autoridades competentes y a cooperar plenamente en cualquier
  investigación subsiguiente. La Empresa cooperará plenamente con las autoridades
  gubernamentales y organismos reguladores para garantizar el cumplimiento de
  todas las leyes y regulaciones en materia de prevención de lavado de dinero.</p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><b style="mso-bidi-font-weight:normal">7)</b> <b style="mso-bidi-font-weight:normal"><u>Aceptación
  de términos y condiciones:</u></b> Al utilizar nuestra plataforma, usted acepta
  plenamente estos términos y condiciones de prevención de lavado de dinero. El
  incumplimiento de estas disposiciones puede dar lugar a la suspensión o
  cancelación de su cuenta, así como a la denuncia a las autoridades competentes.</p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="text-align:justify;line-height:115%"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" align="center" style="margin-top:14.0pt;margin-right:0cm;
  margin-bottom:14.0pt;margin-left:0cm;text-align:center;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO V.- ÓRDENES.<o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Órdenes de
  retiro:</u></b> A través de la Plataforma el Usuario podrá realizar órdenes
  para efectuar retiros en Activos Digitales, de conformidad con la licencia del
  Proveedor de Servicios.&nbsp;El Usuario es el único responsable de garantizar
  la exactitud de la información incluida en la Órden de </span>R<span style="color:black">etiro, incluyendo número de cuenta, número de cuenta
  bancaria, dirección de </span>la Billetera Digital<span style="color:black">,
  etiqueta de destino y cualquier otra información confidencial o no confidencial
  que la Empresa solicite, dependiendo del tipo de retiro solicitado por el
  Usuario. La Empresa no podrá cancelar ninguna Órden de </span>R<span style="color:black">etiro una vez que se haya iniciado.<b style="mso-bidi-font-weight:
  normal"><u><o:p></o:p></u></b></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1.1)</span></b><span style="color:black"> Un retiro realizado en Activos Digitales se realizará a la
  </span>Billetera Digital<span style="color:black"> especificada en la Órden de</span>
  R<span style="color:black">etiro. Algunas </span>Billeteras Digitales<span style="color:black"> requieren información adicional para procesar la
  transacción, esto deberá ser&nbsp;proporcionado por el Usuario en la Órden de
  retiro cuando corresponda.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1.2)</span></b><span style="color:black"> La Empresa no garantiza los plazos de
  efectivización&nbsp;de los retiros de Activos Digitales o Divisa Fiduciaria,
  los que pueden demorarse o no estar disponibles por causas no imputables a la
  Empresa.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1.3)</span></b><span style="color:black"> En el caso de que el Usuario no proporcionare una cuenta
  válida, habilitada, o la misma fuese proporcionada con un número de cuenta
  incorrecto o incompleto, moneda de la cuenta errónea, o cualquier otro motivo
  que imposibilitar</span>a<span style="color:black"> el correcto procedimiento
  de la operación, el retiro no podrá ejecutarse hasta tanto se cumplimente con
  los requisitos necesarios.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1.4) Exención de
  responsabilidad: </span></b><span style="color:black">La Empresa no será
  responsable ante el caso de que el Usuario se encuentre momentáneamente
  imposibilitado de hacer retiro de sus fondos porque el banco, entidad o
  billetera destinatarios solicitaran información, documentación complementaria,
  o por cualquier tipo de motivo cursado por la entidad del destinatario. El
  Usuario es el único responsable en la relación contractual que mantiene con la
  entidad bancaria o billetera virtual a la que envía sus fondos a retirar.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">No se ejecuta retención indebida cuando el Usuario desea
  ejecutar un retiro y su perfil se encuentra inhabilitado por estar incompleto o
  por alguna causal de suspensión. La Empresa no se responsabiliza por el destino
  de los activos digitales. No se realizarán retiros manuales de saldo a terceros
  no registrados en la Plataforma o que no se encuentren adheridos al sistema.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">La Empresa se reserva el derecho de inmovilizar los saldos
  de cuenta e impedir la transferencia a terceros por parte de los Usuarios en
  caso de ser cursado cualquier tipo de requerimiento judicial o agencia
  gubernamental que así lo exigiera, o bien por violación a estos TyC.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Transferencias:</u></b>
  Por regla general los usuarios solo pueden transmitirse Activos Digitales entre
  ellos, </span>encontrándose prohibida<span style="color:black"> cualquier otra
  transacción no establecida en estos TyC.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3) <u>Conversiones:</u></span></b><span style="color:black"> La Empresa provee los servicios de conversión de Activos
  Digitales y Divisas Fiduciarias. Mediante determinados Servicios el Usuario
  puede convertir Divisas Fiduciarias en Activos Digitales (y viceversa), en los
  que la Plataforma ejecuta las Órdenes de compra o venta de un Activo Digital en
  otras redes de Activos Digitales en nombre del Usuario después de recibir su
  Órden, transfiriendo sus Divisas Fiduciarias/ Activos Digitales de su Cuenta a
  dicha red para que así una determinada denominación de Divisa Fiduciaria/Activo
  Digital se convierta en otra. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">Dado que la Conversión podría requerir integración con
  otras redes de Activos Digitales, nos encontramos sujetos a sus términos y a
  ciertas reglas de no mantener los precios en relación con el valor de las
  Divisas Fiduciarias. Por lo tanto, no podemos garantizar que no puedan&nbsp;
  presentarse ligeras variaciones.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">4) <u>Depósitos</u>:
  </span></b><span style="color:black">El Usuario, reconoce que es único
  responsable de verificar, las redes disponibles para depositar Activos
  Digitales soportados por la Plataforma, como así mismo hacerse cargo de los
  costos que pueda generar dicha operación. La Empresa, no se responsabiliza por
  el envío a través de redes incorrectas o de Activos Digitales que no sean
  soportados y el Usuario reconoce que dicha operatoria podrá ocasionar que los
  Activos Digitales no lleguen a destino y/o su recuperaci</span>ón<span style="color:black"> tenga un costo extra que estará exclusivamente a cargo del
  usuario.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">4.1)</span></b><span style="color:black"> En algunos casos, determinados Activos Digitales
  soportados por la Plataforma, tienen un monto mínimo de operación de Depósito.
  Este monto es ajeno a la Empresa y podrá ser dispuesto por otras plataforma</span>s,<span style="color:black"> proveedores o redes. El Usuario deberá verificar dicha
  información previamente a avanzar con la operación.&nbsp;<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal">4.2) </b>Un Depósito se puede hacer en
  Moneda Fiduciaria o en Criptomoneda. Un Depósito realizado en una Moneda
  Fiduciaria puede hacerse desde una cuenta de una entidad financiera registrada
  a nombre del usuario, en efectivo o a través de los Proveedores de Servicios de
  Cobro y de Pagos disponible en tu jurisdicción, o cualquier otra empresa
  proveedora de servicios similares con la que contratemos en un futuro.La
  Empresa se reserva el derecho a rechazar transacciones, lo que provocará la
  devolución en los tiempos que la Empresa estipule.<br>
  <br>
  <b style="mso-bidi-font-weight:normal">4.3)</b> Por el presente, el Usuario
  autoriza a La Empresa a comunicarse con cualquiera de las entidades financieras
  y empresas proveedoras intervinientes para proporcionar u obtener cualquier
  información requerida en relación con la prestación de las Funciones, origen de
  los fondos o validación de datos personales.<br>
  <br>
  <b style="mso-bidi-font-weight:normal">4.4)</b> Los Depósitos solo se pueden
  realizar en las Monedas Fiduciarias o en las Criptomonedas disponibles en la
  Plataforma siguiendo los pasos correspondientes para cada método de pago
  enlistado en la misma. Una Orden de Depósito se acreditará en tu Cuenta, dentro
  del período de tiempo que La Empresa determine, a su entera discreción. La
  elección de la red de envío y la de recepción de criptomonedas deberá ser
  controlada por el Usuario, ya que la Plataforma no se hará ni podrá hacerse
  responsable de ninguna pérdida o daño que puedan sufrir los activos a través de
  transacciones que los Usuarios hayan realizado o iniciado fuera de la
  Plataforma.<br>
  <br>
  <b style="mso-bidi-font-weight:normal">4.5)</b> La Empresa no garantiza la
  capacidad y disponibilidad para completar un Depósito en un período de tiempo
  determinado. Los Depósitos pueden demorarse o no estar disponibles como
  resultado de un tiempo de inactividad del sistema, errores de la red local o
  inconvenientes de terceros. Los plazos podrán ser determinados por la Empresa,
  a su entera discreción.<br>
  <br>
  <b style="mso-bidi-font-weight:normal">4.6)</b>. El Usuario entiende y acepta
  que la Empresa, por sí misma o por cuenta de proveedores de servicios
  vinculados, ejerza la tenencia de las Criptomonedas por cuenta y orden del
  Usuario. La Empresa no tiene autorización para usarlas de otra manera distinta
  a la descripta en estos TyC.<br>
  <br>
  <b style="mso-bidi-font-weight:normal">4.7)</b> El Usuario entiende y acepta
  que la Criptomoneda depositada se pierde sin culpa de la Empresa, la pérdida
  deberá ser soportada por el Usuario de la Cuenta y de ninguna manera podrá
  responsabilizar a la Empresa de ningún daño directo y/o indirecto, lucro
  cesante, y/o pérdida de chance que resulten de la pérdida de la criptomoneda.<br>
  <br>
  <b style="mso-bidi-font-weight:normal">4.8)</b> El Usuario entiende y acepta
  que al día de la fecha no existen estándares en materia de custodia de
  Criptomonedas y por lo tanto la Empresa cumplirá con las mejores prácticas de
  la industria y utilizará las medidas de seguridad que a su leal y saber
  entender resulten más adecuados de acuerdo a las normativas y principios que
  rigen a la actividad en los países en los que opera la Empresa.<br>
  <br>
  <b style="mso-bidi-font-weight:normal">4.9)</b> El Usuario entiende y acepta
  que bajo ninguna circunstancia hará responsable a la Empresa por caso fortuito,
  fuerza mayor o hecho del príncipe derivado de la Custodia de las Criptomonedas
  y las Monedas Fiat depositadas.</p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><br>
  <b style="mso-bidi-font-weight:normal"><span style="color:black">5) <u>Programar
  Operaciones:</u></span></b><span style="color:black"> La empresa podrá
  establecer, exclusivamente para determinadas operaciones dentro de la
  plataforma, la posibilidad de programar el autoswap o intercambio automático de
  activos digitales o monedas fiduciarias.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">5.1)</span></b><span style="color:black"> La empresa podrá establecer, exclusivamente para
  determinadas operaciones dentro de la plataforma, la posibilidad de programar
  activos digitales de respaldo para sus operaciones. La mencionada opción
  permite al usuario seleccionar un activo digital de respaldo para que al
  momento de realizar determinadas operaciones en un activo digital y no tenga
  los fondos suficientes, la operación se realizará en forma íntegra con el
  activo digital de respaldo. El usuario podrá modificar y/o desactivar en todo
  momento el activo digital de respaldo.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">6) <u>Pautas
  generales para operacione</u>s:</span></b><span style="color:black"> El Usuario
  acepta que cuando realiza un retiro en un Activo Digital, es consciente del
  riesgo de transmitir/enviar Activos Digitales a la cuenta de destino
  incorrecta, lo que puede ocasionar la pérdida irreparable de sus Activos
  Digitales. La Empresa no será responsable en ninguno de estos casos. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">6.1) Redes
  compatibles para depósito y retiro de activos Digitales: </span></b><span style="color:black">El Usuario debe seleccionar la Red que sea compatible en
  origen como en destino para que los mismos lleguen correctamente. Es importante
  utilizar la Red correcta y compatible con nuestra plataforma de lo contrario se
  corre el riesgo de perder los Activos Digitales. Las redes disponibles pueden
  variar e incluso generar comisiones que estarán a cargo exclusivamente del
  cliente, que son cobradas por la Red y no por la Empresa. Asimismo la Empresa
  eventualmente sólo cobrará comisiones por las transferencias que se remitan
  desde la app y bajo el concepto de mantener disponible la compatibilidad con
  las diferentes redes. La Empresa no acepta transferencias realizadas a través
  de cualquier tipo de Bridge.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">En caso de que el Usuario por error realice el envío por
  redes incorrectas o que no se encuentren listadas, la Empresa realizará el
  intento de recuperar los Activos Digitales, pero el Usuario entiendo que en
  determinados casos no será posible y podrá ocasionar la pérdida irreparable de
  sus Activos Digitales. En el caso de recuperación de los Activos Digitales, el
  usuario deberá abonar los costos de red y una comisión de recuperación del 10%
  de los Activos Digitales.&nbsp;&nbsp;<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">6.2) Activos
  Digitales No listados:</span></b><span style="color:black"> En el caso de que
  el Usuario por error realice el envío de Activos Digitales que no se encuentren
  listados en la Plataforma o a través de una Red que no se encuentre listada,
  los mismos no podrán verse reflejados en su cuenta. La empresa no se encuentra
  obligada a permitir la operación de Activos Digitales que no estén listados. La
  empresa podrá convertir los Activos Digitales no listados, a USDC, USDT </span>u<span style="color:black"> otro Activo Digital listado, a criterio de la Empresa y
  acreditarlo en la cuenta del Usuario.&nbsp;La cotización utilizada para hacer
  la conversión será la correspondiente al día de la acreditación en la cuenta
  del Usuario.&nbsp;<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">El Usuario entiende que la conversión de Activos Digitales
  no es obligación de la empresa y que en determinados casos podrá ocasionar la
  pérdida irreparable de sus Activos Digitales. En el caso de recuperación de los
  Activos Digitales, el usuario deberá abonar los costos de red y una comisión de
  recuperación de</span> hasta el<span style="color:black"> </span>2<span style="color:black">0% (veinte por ciento</span>)<span style="color:black"> de
  los Activos Digitales.&nbsp;&nbsp;<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" align="center" style="margin-top:14.0pt;margin-right:0cm;
  margin-bottom:14.0pt;margin-left:0cm;text-align:center;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO VI.- PAUTAS PARA UN CORRECTO USO DE LA
  CUENTA.<o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1) <u>Finalidad:</u></span></b><span style="color:black"> El Usuario no utilizará los Servicios para ningún fin que
  sea ilegal y no realizará operaciones de ningún tipo en la Plataforma que sean
  contraria a la moral, costumbres o normas locales o internacionales o que de
  alguna forma se vincule con el lavado de activos y/o financiamiento del
  terrorismo, trata de personas, tráfico de armas, o actividades que tengan por
  finalidad la financiación, participación o apoyo de algún modo en cualquier
  actividad ilegal.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Intransferibilidad:</u>
  </b>Se destaca que, en todos los casos, la Cuenta es personal, única e
  intransferible, y será asignada a un solo Usuario y está prohibida su venta,
  cesión o transferencia (incluyendo la reputación) bajo cualquier título. El
  Usuario no podrá permitir ni autorizar el uso de su Cuenta por terceras
  personas. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Inconvenientes
  en los servicios de la plataforma:</u> </b>Para el caso de que la Plataforma
  sufra un ataque y/o una interrupción y/o caída de servicio y/o desperfecto y/o
  situación que impida durante un determinado plazo el normal desarrollo de la
  actividad realizada en la misma, el Usuario entiende y acepta que la Empresa
  podrá dentro de las 48hs, revisar las transacciones realizadas durante ese
  lapso y efectuar los ajustes correspondientes. En particular, la Empresa podrá
  revisar que durante el plazo en que la Plataforma no haya tenido su normal
  desarrollo, las operaciones realizadas no sean desproporcionadas a la realidad
  del mercado ni contrarias a la buena fe, la moral y las buenas costumbres
  comerciales y&nbsp;el Usuario acepta que la Empresa realice los ajustes
  necesarios para subsanar dicha operatoria. Asimismo, el Usuario al detectar
  operatoria que cumpla con las características mencionadas podrá contactarse con
  el soporte técnico mediante los canales oficiales para solicitar el
  correspondiente ajuste.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">4)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Explotación
  abusiva de arbitraje:</u> </b>Los errores en la conexión a Internet, la
  conectividad y la alimentación de precios a veces crean una situación en la que
  los precios que se muestran a través de la Plataforma no reflejan con precisión
  las tarifas del mercado. La Empresa se reserva el derecho, a nuestra entera
  discreción, de no permitir la explotación abusiva de Arbitraje (concepto de
  utilizar estrategias comerciales con el fin de explotar errores en los precios
  y/o realizar operaciones a precios fuera del mercado y/o aprovechando los
  retrasos en Internet, comúnmente conocidos como “arbitraje”, “sniping” o
  “scalping” en lo sucesivo, conjuntamente, denominados “Arbitraje”) a través de
  nuestros Servicios o en relación con nuestros Servicios; cualquier Transacción
  que se base en las oportunidades de arbitraje de latencia de precios puede ser
  revocada, a nuestra entera discreción y sin previo aviso.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">Cualquier indicación o sospecha, determinada a nuestra
  entera discreción, de cualquier forma, de explotación abusiva de Arbitraje
  (incluyendo, entre otros, los patrones de actividad comercial del participante
  que indiquen un intento voluntario de beneficiarse de una explotación abusiva),
  fraude, manipulación o cualquier otra forma de actividad engañosa o
  fraudulenta, hará que todas las Transacciones realizadas y/o las ganancias o
  pérdidas se determinen como inválidas. En estas circunstancias, nos reservamos
  el derecho de suspender (ya sea de forma temporal o permanente) tu Cuenta y
  cancelar todas las Transacciones.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">5)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Confidencialidad
  y Seguridad de la Cuenta:</u> </b>El Usuario se obliga a mantener la
  confidencialidad de sus datos de acceso, incluida la contraseña de Ingreso,
  denominación de la Cuenta, Identificación del Usuario, Códigos de desbloqueo
  del dispositivo y toda aquella forma de identificación y acceso a la
  Plataforma. El Usuario será el único y exclusivo responsable por todas las
  operaciones efectuadas en su Cuenta con sus datos de acceso. El Usuario se
  compromete a notificar a la Compañía en forma inmediata y por los canales de
  comunicación habilitados, en caso de detectar y/o tomar conocimiento de
  cualquier uso no autorizado de su Cuenta, así como del ingreso o de intentos de
  ingreso por terceros no autorizados a la misma y/o cualquier otra violación de
  seguridad de su Cuenta. El personal de La Empresa nunca le pedirá al Usuario
  que divulgue sus contraseñas.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">6)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Suspensión o
  Terminación de la Cuenta:</u></b> La Empresa podrá cancelar o suspender la
  Cuenta del Usuario en cualquiera de los siguientes casos: <b style="mso-bidi-font-weight:
  normal">(a)</b> denuncia por parte del Usuario de una violación de seguridad
  y/o confidencialidad de su Cuenta, conforme lo regulado en los presentes TyC, <b style="mso-bidi-font-weight:normal">(b)</b> requerimiento judicial o de
  autoridad competente, <b style="mso-bidi-font-weight:normal">(c)</b> sospecha
  fundada de fraude, uso ilegal o prohibido a criterio exclusivo de la Empresa,<b style="mso-bidi-font-weight:normal"> (d)</b> falta de provisión y/o
  adulteración de los datos, información y/o documentación solicitada para la
  apertura y/o mantenimiento de la Cuenta, <b style="mso-bidi-font-weight:normal">(e)</b>
  incumplimiento de estos TyC y/o de la Política de Privacidad de La Empresa, y <b style="mso-bidi-font-weight:normal">(f)</b> a discreción exclusiva de la
  Empresa. En todos los casos, la Empresa no asumirá responsabilidad alguna y se
  reserva el derecho de emprender las acciones legales correspondientes.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">6.1)</span></b><span style="color:black"> En caso de suspender o cancelar una Cuenta, la Empresa <b style="mso-bidi-font-weight:normal"><u>notificará</u></b> al
  Usuario&nbsp;enviando un correo electrónico a la dirección de correo
  electrónico registrada en la Cuenta. Ante la suspensión o cancelación de la
  Cuenta, el Usuario no podrá emitir nuevas órdenes, a excepción de las que
  tengan por finalidad retirar sus tenencias, debiéndose hacer cargo de los
  costos que generen dichas transacciones. En el caso en que la suspensión o
  cancelación conlleve una orden de retención dispuesta por autoridad competente,
  el Usuario no podrá retirar sus tenencias, no siendo responsable la Empresa por
  cualquier daño o perjuicio que esta situación pudiera ocasionarle al Usuario.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">7)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Cierre de Cuenta
  a solicitud del Usuario:</u></b> Ante la solicitud del Usuario de cierre de su
  Cuenta por los canales oficiales y habilitados a tal efecto, se procederá a la
  baja de la misma. La solicitud de Cierre no podrá ser procesada si la Empresa
  recibe una notificación fehaciente de autoridad competente disponiendo la
  retención u otra medida similar que restrinja la disponibilidad de la Cuenta.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">8) <u>Registro:</u></span></b><span style="color:black"> La información del Usuario y de las transacciones
  efectuadas en la Cuenta permanecerá durante toda la vida de la Plataforma, o el
  tiempo que La Empresa considere que deje de ser necesaria o pertinentes a los
  fines para los cuales ha sido recolectada.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">9) <u>Propiedad
  intelectual:</u> </span></b><span style="color:black">Los contenidos de la
  Plataforma como así también los programas, bases de datos, redes y archivos que
  permiten al Usuario acceder y usar su Cuenta en la Plataforma, son de propiedad
  exclusiva de la Compañía y están protegidas por las leyes y los tratados internacionales
  de derecho de autor, marcas, patentes, modelos y diseños industriales. El uso
  indebido y la reproducción total o parcial de dichos contenidos quedan
  prohibidos, salvo autorización fehaciente de la Empresa.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">10)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Enlaces Externos
  o Acceso a aplicaciones de terceros:</u> </b>La Plataforma puede contener
  enlaces a sitios web o accesos a aplicaciones de terceros lo cual no indica que
  sean propiedad u operados por la Compañía, ni que tengan relación alguna con
  ésta. Asimismo, para el acceso de aplicaciones de terceros y el uso del
  servicio ofrecido, los usuarios deberán aceptar los Términos y Condiciones del
  tercero. En virtud de que la Empresa no tiene control sobre tales sitios o
  aplicaciones, no será responsable por los contenidos y/o materiales y/o
  acciones y/o servicios prestados por los mismos, ni por daños y/o pérdidas
  ocasionadas a los Usuarios por su utilización, sean causadas directa o
  indirectamente. La presencia de enlaces a otros sitios web o aplicaciones no implica
  una sociedad, relación, aprobación ni respaldo de la Empresa, ni de sus
  sociedades vinculadas o controladas con los titulares de dichos sitios o
  contenidos<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" align="center" style="margin-top:14.0pt;margin-right:0cm;
  margin-bottom:14.0pt;margin-left:0cm;text-align:center;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO VII.- Limitación de la responsabilidad:<o:p></o:p></span></u></b></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">1)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Daños por
  interrupción de servicio, virus, spyware, malware, pishing:</u> </b>La Empresa
  no será responsable en caso de daño o interrupción del servicio de la
  Plataforma por causas externas a la Empresa. Asimismo, tampoco será responsable
  en caso de daño o interrupción causados por cualquier virus informático,
  spyware u otro malware que pueda afectar tu computadora u otro equipo, o
  cualquier ataque de suplantación de identidad (phishing), falsificación
  (spoofing) u otro tipo de ataque. Si el Usuario desconfía de la autenticidad de
  una comunicación que pretende ser de La Empresa, no debe aceptar la misma y
  deberá notificar a La Empresa por los canales de comunicación oficiales
  habilitados a tal efecto. El Usuario siempre deberá acceder a la Plataforma por
  los medios informados en los canales oficiales. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2) <u>Daños por
  caso fortuito o fuerza mayor</u>: </span></b><span style="color:black">La
  Empresa no será responsable, ni se considerará que ha incumplido estos TyC, por
  cualquier incumplimiento o demora en el cumplimiento o desempeño de sus
  obligaciones, en el caso y en la medida en que dicho incumplimiento o demora
  esté relacionado con situaciones ajenas y más allá de su control razonable,
  incluyendo, pero sin limitación: fuerza mayor; inundación, incendio, terremoto
  o explosión; guerra, invasión, hostilidades, terrorismo, piratería o amenazas,
  ataques o actos informáticos u otros disturbios civiles; cualesquier
  legislación, estatutos, ordenanzas, reglas, reglamentos, sentencias,
  mandamientos judiciales, órdenes y decretos; o&nbsp; la acción de cualquier
  Nación o Gobierno, Estado u otra subdivisión política del mismo, cualquier
  entidad que ejerza funciones legislativas, regulatorias, judiciales o
  administrativas de o relacionadas con el gobierno, incluyendo, sin limitación,
  cualquier autoridad gubernamental, agencia, departamento, junta, comisión o
  consejo.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3) <u>Limitaciones
  del servicio</u></span></b><span style="color:black"> El acceso a los Servicios
  puede estar parcial o totalmente limitado durante condiciones de alta demanda,
  volatilidad o aumento en el volúmen de operaciones</span> o usuarios
  simultáneos<span style="color:black">. Como consecuencia, podrán existir
  ciertas limitaciones en el acceso a la Plataforma, dentro de las cuales
  pudieran encontrarse la imposibilidad de emitir Órdenes, lo cual también
  pudiera derivar en retrasos por parte de la Empresa en la atención y soporte al
  Usuario. La Empresa en ningún caso será responsable de cualquier interrupción,
  falla o retraso en la aceptación, ejecución o cancelación de ningún tipo de
  orden así como de la estabilidad de la Plataforma, interrupciones en los
  Servicios, retrasos en el procesamiento de transacciones o en la respuesta de
  nuestros agentes de soporte por tales circunstancias.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">4)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Fallecimiento
  del titular de la Cuenta:</u></b> En caso de fallecimiento o incapacidad
  sobreviniente del Usuario, los herederos o representantes legales deberán
  presentar la documentación que solicite la Empresa para poder tener acceso a la
  Cuenta. Hasta tanto no se verifiquen los recaudos exigidos por la Empresa para
  conceder el acceso, la Cuenta se mantendrá suspendida. Una vez cumplimentados
  los recaudos, La Empresa dará acceso a la Cuenta a los autorizados al solo
  efecto del retiro de las tenencias registradas en la Cuenta y el cierre de la
  misma.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">5)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Fork:</u> </b>La
  Plataforma no controla ni posee injerencia alguna en los protocolos (en
  adelante los “Protocolos”) base que sostienen la operación de los Activos
  Digitales listados</span>. Po<span style="color:black">r</span> ello<span style="color:black">, la Plataforma no será responsable por el funcionamiento
  de los Protocolos, ni garantizará su operación, seguridad ni disponibilidad.
  Asimismo, los Usuarios declaran estar en conocimiento de que los Protocolos
  pueden ser sujetos de modificaciones a sus reglas de operación (“Forks”) y que
  dichas modificaciones pueden afectar materialmente el valor, la utilidad y la
  disponibilidad de los Activos Digitales cuyo protocolo se ve modificado. En
  consecuencia, en caso de ocurrir un Fork que afectase a alguna de los Activos
  Digitales listados por la Plataforma, el Usuario acepta que se pueda suspender
  temporalmente toda operación vinculada a la misma (con o sin aviso previo de
  nuestra parte) y que la Plataforma podrá a su entera discreción decidir operar
  (o dejar de operar) los Activos Digitales subyacentes que el Protocolo
  modificado por un Fork origine.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">El Usuario reconoce y acepta que la Plataforma 1) no se
  encuentra obligada a listar los nuevos Activos Digitales originados por Fork;
  2) no asumirá ninguna responsabilidad por cualquier perjuicio ocasionado con
  motivo de un Fork no soportado por la Plataforma. La Plataforma se reserva a su
  exclusivo criterio la decisión de admitir nuevos Activos Digitales, reglas de
  operación u otras acciones.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">En caso de que la Plataforma se pronuncie negativamente
  ante un eventual Fork a uno de los Protocolos soportados, o no pronunciare su
  posición respecto al mismo, y un Usuario desease participar del resultado del
  mismo, este último deberá retirar los Activos Digitales del Protocolo afectado
  de su Cuenta a una billetera que soporte el Fork ANTES de la fecha
  presupuestada para el Fork. La Plataforma no asumirá responsabilidad alguna en
  relación a cualquier intento de usar los Servicios para Activos Digitales que
  no soporte.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">Corresponde, a exclusivo criterio de la Plataforma,
  determinar qué tipo de Activos Digitales serán ofrecidos. En consecuencia, la
  Plataforma podrá, a su exclusiva voluntad, agregar otros Activos Digitales
  adicionales a los actualmente soportados, o dejar de soportar uno o más de los
  actualmente ofrecidos.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">6) <u>Contacto
  con personal de la Empresa</u></span></b><span style="color:black">: El Usuario
  reconoce que, cualquier interacción que mantenga con un empleado de la Empresa
  será llevada a cabo a los fines de brindar el soporte adecuado para la correcta
  utilización del servicio.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">Resulta totalmente prohibido para el Usuario divulgar
  cualquier comunicación, sea por e-mail, llamada telefónica, whatsapp, telegram,
  Skype, o cualquier medio afín, en la que se brinde soporte por parte de un
  empleado de la empresa. El nombre y apellido, e-mail, teléfono, dirección o
  cualquier otro dato personal de un empleado de Empresa reviste carácter
  confidencial y su divulgación por cualquier medio queda terminantemente
  prohibida, siendo su incumplimiento causal de cierre de cuenta, sin perjuicio de
  ejercer las acciones legales que se estimen convenientes, por los daños y
  perjuicios que pudieran generarse.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">Asimismo, el personal de La Empresa sólo se contactará a
  través de los canales oficiales publicados en la página web y nunca le pedirá
  al Usuario que divulgue sus contraseñas.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">7)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Prueba de
  solvencia:</u> </b>Los Usuarios podrán solicitar el acceso a un informe
  (“auditoría”), en el que se detallan y&nbsp;evidencian las reservas y pasivos
  de la Empresa con el objetivo de demostrar su solvencia. Dicha auditoría se
  actualizará todas las semanas, pero estará disponible en todo momento para su
  consulta y descarga. El alcance de esta auditoría incluye únicamente las
  obligaciones contraídas con nuestros usuarios. La Prueba de Solvencia es el
  resultado de la combinación de la Prueba de Reservas y la Prueba de Pasivos,
  con mecanismos transparentes que le permiten a nuestros usuarios validar que el
  importe total de los activos custodiados cubre el importe total de los
  pasivos.&nbsp;<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">La solvencia en cada </span>criptomoneda<span style="color:black"> puede representarse según su índice de colateralización,
  que es la división entre las reservas y los pasivos de es</span>a criptomoneda<span style="color:black">, expresado de forma porcentual. Para que cualquier
  exchange sea solvente, los activos deben ser mayores o iguales que las
  obligaciones, es decir que el índice debe ser mayor o igual al 100%. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">8) <u>Prueba de
  Reserva:</u></span></b><span style="color:black"> Con el objetivo de brindar
  transparencia respecto a los fondos en custodia de nuestros usuarios, desde la
  página web o aplicativos se podrá acceder a una Prueba de Reservas en tiempo
  real. Dentro de la misma, se evidencian en tiempo real los saldos de los tokens
  o criptomonedas que la Empresa posee en sus cuentas.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">9)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Prueba de
  pasivos:</u></b> Los pasivos se refieren a los saldos totales de todos los
  usuarios de la Empresa. tiene el objetivo de proporcionar transparencia sobre
  nuestras obligaciones totales asegurando que estas contemplan los saldos de
  cada uno de los usuarios. <a name="bookmark=id.1fob9te"></a><a name="bookmark=id.3znysh7"></a>Para lograr esto sin sacrificar la privacidad de
  los usuarios, nuestra Prueba de Pasivos se genera a partir de un&nbsp;<i style="mso-bidi-font-style:normal">Merkle Tree&nbsp;</i>(o “Árbol de Merkle”),
  un método criptográfico que se utiliza para verificar de forma segura la
  validez y el origen de un contenido específico dentro de grandes estructuras de
  datos.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black"><o:p>&nbsp;</o:p></span></p>
  
  <p class="MsoNormal" align="center" style="margin-top:14.0pt;margin-right:0cm;
  margin-bottom:14.0pt;margin-left:0cm;text-align:center;line-height:115%;
  border:none;mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">TÉRMINOS Y
  CONDICIONES PARA EL USUARIO: CAPÍTULO VIII.- Consideraciones finales:</span></u></b><span style="color:black"><o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><u><span style="color:black">1)
  Divisibilidad:</span></u></b><span style="color:black"> Si cualquier término,
  cláusula o disposición de estos TyC se considera ilegal, nula o inejecutable
  (en todo o en parte), dicho término, cláusula o disposición será separable de
  estos TyC sin afectar la validez o exigibilidad de cualquier parte restante de
  estos TyC, cláusula o disposición, que permanecerán en pleno vigor y efecto.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">2) <u>Cesión:</u></span></b><span style="color:black"> Los presentes TyC, la relación jurídica y los derechos y
  obligaciones resultantes, así como cualquier derecho que surja sobre la Cuenta
  del Usuario, no podrán ser cedidos, vendidos ni transferidos, por ningún motivo
  y bajo ningún título a ninguna otra persona.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><span style="color:black">En el supuesto en que la Empresa forme parte de una
  operación de adquisición, fusión, escisión, transformación o venta con una
  tercera persona ajena o perteneciente al mismo grupo, la empresa se reserva el
  derecho, en cualquiera de estas circunstancias, a transferir o ceder estos TyC
  y la relación jurídica que une al Usuario con la Empresa, así como también la
  información del Usuario en un todo de acuerdo con la normativa sobre protección
  de datos personales que resulte aplicable.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">3)</span></b><span style="color:black"> <b style="mso-bidi-font-weight:normal"><u>Canales de
  atención y comunicación disponibles. Medios de notificación:</u></b> Todas las
  notificaciones y comunicaciones que deba realizar la Empresa al Usuario, se
  considerarán válidas y recepcionadas cuando se realicen a través de la
  Plataforma o mediante correo electrónico a las direcciones informadas por el
  Usuario a la Empresa. El Usuario podrá comunicarse con la Empresa ante una
  consulta, queja o reclamo, por chat dentro de la App o bien por correo
  electrónico a través de las canales oficiales. La Empresa proveerá canales de
  atención al cliente 24 horas.<o:p></o:p></span></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><o:p>&nbsp;</o:p></p>
  
  <p class="MsoNormal" style="margin-top:14.0pt;margin-right:0cm;margin-bottom:
  14.0pt;margin-left:0cm;text-align:justify;line-height:115%;border:none;
  mso-padding-alt:31.0pt 31.0pt 31.0pt 31.0pt;mso-border-shadow:yes"><b style="mso-bidi-font-weight:normal"><span style="color:black">4) <u>Jurisdicción
  y Ley Aplicable:</u></span></b><u><span style="color:black"> </span></u><span style="color:black">La interpretación y alcance de estos TyC será de acuerdo a
  la normativa vigente de Estados Unidos. Cualquier divergencia que pudiere
  suscitarse en virtud de los presentes TyC o que se derivase del uso y
  funcionamiento de la Plataforma, previo a una acción judicial, se intentará la
  vía del TRATO DIRECTO en la siguiente forma: en ocasión de producirse una
  controversia en la interpretación o ejecución de estos TyC, las partes harán lo
  posible por llegar a una solución amigable. <o:p></o:p></span></p>
  
  <p class="MsoNormal" style="line-height:115%"><o:p>&nbsp;</o:p></p>
  
  </div>
  
  
  
  
  </body></html>`;

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
    <SafeAreaView>
      <ScrollView
        // ref={scrollViewRef}
        // onScroll={handleScroll}
        // scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Términos y Condiciones</Text>
        <WebView
          originWhitelist={["*"]}
          source={{ html: htmlContent }}
          onMessage={(event) => {}}
          javaScriptEnabled={true}
          // style={{ opacity: loading ? 0 : 1 }}
        />
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
          <TouchableOpacity
            // disabled={!formState.isFormValid}
            // onPress={onHandleAuth}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>
              CONFIRMAR TÉRMINOS Y CONDICIONES
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            // disabled={!formState.isFormValid}
            // onPress={onHandleAuth}
            style={[styles.rejectButton]}
          >
            <Text style={styles.buttonText}>
              RECHAZAR TÉRMINOS Y CONDICIONES
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
