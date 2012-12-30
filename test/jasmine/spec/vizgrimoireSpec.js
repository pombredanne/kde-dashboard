describe( "VizGrimoireJS library", function () {
    describe( "Report", function () {
        it("data files should be loaded", function () {
            waitsFor(function() {
                return Report.check_data_loaded();
            }, "It took too long to load data", 100);
            runs(function() {
                expect(Report.check_data_loaded()).toBeTruthy();
            });
        });
        
        var blocks = ["navigation","refcard","header","footer"];
        it(blocks.join() + " should be loaded from file", function () {
            var loaded = null;
            
            waitsFor(function() {
                return Report.check_data_loaded();
            }, "It took too long to load data", 100);
            runs(function() {
                $.each(blocks, function(index, value) {buildNode(value);});
            });
            waitsFor(function() {
                $.each(blocks, function(index, value) {
                    Report.getBasicDivs()[value].convert();});                
                loaded = document.getElementsByClassName('info-pill');
                return (loaded.length > 1);
            }, "It took too long to convert " + blocks.join(), 100);
            runs(function() {
                $.each(blocks, function(index, value) {
                    expect(document.getElementById(value).childNodes.length)
                    .toBeGreaterThan(0);});
            });
        });
        
        describe( "html report should be converted", function () {        
            it("html envision should be displayed", function () {
                waitsFor(function() {
                    return Report.check_data_loaded();
                }, "It took too long to load data", 100);
                runs(function() {
                    buildNode("scm-envision");
                    buildNode("its-envision");
                    buildNode("mls-envision");
                    Report.report();
                    var envisionCreated = document.getElementsByClassName
                        ('envision-visualization');
                    expect(envisionCreated.length).toEqual(3);
                });        
            });
            it("html flotr2 should be displayed", function () {
                waitsFor(function() {
                    return Report.check_data_loaded();
                }, "It took too long to load data", 100);
                runs(function() {
                    $.each(Report.getDataSources(), function(index, DS) {
                        $.each(DS.getMetrics(), function(i, metric) {
                            buildNode(metric.divid+"-flotr2");
                        });
                    });
                    Report.convertFlotr2();
                });        
            });

        });
        
    });
    describe("Viz", function () {
        
    });
    describe("Data Sources", function () {
        
    });
    describe("VizGrimoireJS loaded", function() {
        it("should be present in the global namespace", function () {
            expect(Report).toBeDefined();
            expect(Viz).toBeDefined();
            var data_sources = Report.getDataSources();
            $.each(data_sources, function(index, DS) {
                expect(DS).toBeDefined();
            });
        });
    });
    
    function buildNode (id) {
        if (document.getElementById(id)) return;
        var node = document.createElement('div');
        document.body.appendChild(node);
        //node.style.width = '320px';
        //node.style.height = '240px';
        node.id = id;
        return node;
      }

      function destroyNode (node) {
        document.body.removeChild(node);
      }
});