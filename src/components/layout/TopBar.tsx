"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, LogOut, Menu, Moon, Sparkles, Sun, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDesktopDropdown, setShowDesktopDropdown] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  // const { isDark, toggleTheme } = useTheme();
 
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDesktopDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  // const getUserInitials = () => {
  //   if (user?.name) {
  //     return user.name
  //       .split(" ")
  //       .map((n) => n[0])
  //       .join("")
  //       .toUpperCase();
  //   }
  //   if (user?.email) return user.email.charAt(0).toUpperCase();
  //   return "U";
  // };

  const NavButtons = (
    <>
    
        <>
          <Button
            variant="ghost"
            onClick={() => navigate("/home")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          
        </>
      
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-center py-6 px-4 z-50 bg">
        <div className="flex items-center justify-between px-6 py-3 bg-background rounded-2xl shadow-lg w-full max-w-3xl border border-border">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ rotate: 8 }}
              transition={{ duration: 0.25 }}
            />
            <span className="text-xl font-bold tracking-tight text-foreground">
              SlideGen
            </span>
          </div>

          {/* Center nav (desktop) */}
          <div className="hidden md:flex items-center gap-4">{NavButtons}</div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              // onClick={}
              className="rounded-full"
            >
               <Sun className="h-5 w-5" /> 
            </Button>

            
              <Button onClick={() => navigate("/login")} variant="default" size="sm">
                Sign In
              </Button>
           
            {/* Mobile menu toggle */}
            <motion.button
              className="md:hidden flex items-center"
              onClick={toggleMenu}
              whileTap={{ scale: 0.92 }}
            >
              <Menu className="h-6 w-6 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-40 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">{NavButtons}</div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={}
                  className="rounded-full"
                >
                  
                </Button>

                {/* {user ? (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowProfileModal(true);
                      toggleMenu();
                    }}
                  >
                    Profile
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => {
                      navigate("/login");
                      toggleMenu();
                    }}
                  >
                    Sign In
                  </Button>
                )}
                  
              </div> */}

               </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </>
  );
};

export { TopBar };



