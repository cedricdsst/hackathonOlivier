function emailRappelAtelier(title, date, duration, adresse){
    return `
    <div style="background-color:#f4f4f4;" lang="und" dir="auto">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#110E0E" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#110E0E;background-color:#110E0E;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#110E0E;background-color:#110E0E;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <!-- Header -->
                    <tr>
                      <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:140px;">
                                <img alt="Header Image" src="../assets/img/Logo_Hackaton_M1-ESGI_blanc.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="140" height="auto" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin:0px auto;max-width:600px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                <tbody>
                  <!-- Contenu principal -->
                  <tr>
                      <td align="center" style="font-size:0px;padding:0 20px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;font-weight:bold;line-height:1;text-align:center;color:#000000;">Rappel de participation à l'atelier : ${title}</div>
                      </td>
                    </tr>
                    <!-- Left image -->
                    <tr>
                      <td align="center" style="font-size:0px;padding:20px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#000000;">Bonjour, Demain est le grand jour !! <br> <br> Nous vous rappelons que vous vous êtes inscrit à notre atelier de degustation de vins : <strong>${title}</strong></div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:20px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#000000;">N'oubliez pas de venir le :</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"><strong>Date</strong> : ${date}</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"><strong>Heure</strong> : ${duration}</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"><strong>Lieu</strong> : ${adresse}</div>
                      </td>
                    </tr>
                    <tr>
                    <td align="center" style="font-size:0px;padding:0 20px;word-break:break-word;">
                      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">N'hésitez pas à me contacter si vous avez la moindre question : <a href="mailto:bonnetonolivier@gmail.com">bonnetonolivier@gmail.com</a></div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size:0px;padding:20px 0;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                        <tbody>
                          <tr>
                            <td align="center" bgcolor="#8C2C2C" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#8C2C2C;" valign="middle">
                              <a href="#" style="display:inline-block;background:#8C2C2C;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Ajouter à mon calendrier </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div style="background:#110E0E;background-color:#110E0E;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#110E0E;background-color:#110E0E;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><![endif]-->
              <!-- Footer -->
              <!--[if mso | IE]><td class="" style="width:300px;" ><![endif]-->
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:top;width:300px;" ><![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:140px;">
                                  <img alt="Footer Image" src="../assets/img/Logo_Hackaton_M1-ESGI_blanc.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="140" height="auto" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:20px;word-break:break-word;">
                          <p style="border-top:solid 4px #8C2C2C;font-size:1px;margin:0px auto;width:20%;">
                          </p>
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #8C2C2C;font-size:1px;margin:0px auto;width:52px;" role="presentation" width="52px" ><tr><td style="height:0;line-height:0;"> &nbsp;
                    </td></tr></table><![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:20px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:white;">Contact : 06 83 05 90 70 | bonnetonolivier@gmail.com</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </div>
              <!--[if mso | IE]></td><td class="" style="width:300px;" ><![endif]-->
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:top;width:150px;" ><![endif]-->
                <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:25px;">
                                  <a href="#" target="_blank">
                                    <img alt="Facebook Icon" src="../assets/icon/facebook_internet_media_network_social_icon_123257 1.svg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="25" height="auto" />
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td><td style="vertical-align:top;width:150px;" ><![endif]-->
                <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:30px;">
                                  <a href="#" target="_blank">
                                    <img alt="LinkedIn Icon" src="../assets/icon/linkedin_icon_135436 1.svg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" height="auto" />
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `
}

module.exports = { emailRappelAtelier };
