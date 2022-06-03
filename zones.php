<!DOCTYPE html>
<html lang="en">
  
<!-- start: head inject -->
<?php require_once('head_css_shop.php') ?>
<!-- end: head inject -->

  <!-- Body-->
  <body>

  <div class="modalspinner" style="display: none">
      <div class="centerspinner">
          <img alt="" src="admin/assets/loaders/spinner.gif" />
      </div>
  </div>  

    <!--Header Start-->
    <!-- Header End-->

    <!-- Page Title-->
    <div class="page-title">
      <div class="container">
        <div class="column">
          <h1>Contacts</h1>
        </div>
        <div class="column">
          <ul class="breadcrumbs">
            <li><a href="index.php">Home</a>
            </li>
            <li class="separator">&nbsp;</li>
            <li>Maps</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Page Content-->
    <div class="container padding-bottom-2x mb-2">    
      <hr class="margin-top-2x">    
      <h3 class="margin-top-3x text-center mb-30">Delivery Routes</h3>
      <div class="row">

        <div class="col-md-8 col-sm-10">
          <div class="card mb-30">
          <div id="deliv_map"  class="maps-card"></div>
            <div class="card-body">

                <!-- search map here -->
                <h3>Search Locations Here</h3>              
                <form class="address_form" style="padding:10px 0px 30px 0px; background:none;">
                  <div class="form-group">
                    <strong> Search Location</strong><br/>
                    <input  class="form-group" type="text" size="60" id="address" name="address" placeholder="type location" value="" class="address" /><br/>
                  </div>
                 
                  <div class="form-group">
                      <input type="submit" class="btn btn-primary btnSearch" value="Search" /> (options: Morning Side Ngong Road, Muringa Heights )
                      &nbsp;
                      <!-- <input type="button" class="btn btn-primary btnLoadXml" value="Load Xml" /> -->
                  </div>   
                  <br/>                 

               </form>
            </div>
          </div>
        </div>        
      </div>
    </div>
   
<!-- Site Footer-->
<!--End footer Inject-->

<!-- Back To Top Button-->
<a class="scroll-to-top-btn" href="#"><i class="icon-chevron-up"></i></a>

<!--sTART INJECT:  JavaScript (jQuery) libraries, plugins and custom scripts-->
<?php require_once('header_scripts_zones.php')?>
<!--eND INJECT:  JavaScript (jQuery) libraries, plugins and custom scripts--> 

  </body>

</html>