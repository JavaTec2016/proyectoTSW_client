import type React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { use, useRef, useState } from "react";
import Sidebar from "./layout/Sidebar";
export function Navigation({ brandContent, children, onSideToggle = () => { }, content, includeSidebar = false }: { brandContent?: React.ReactNode, children?: React.ReactNode, onSideToggle?: () => any, content?: React.ReactNode, includeSidebar?: boolean }) {
  const { user, logout } = useAuth();
  return (
    <>
      <Navbar expand="md" sticky="top" className="navbar app-navbar">
        <div className="container-fluid">
          {user && user.length > 0 && includeSidebar && (
            <button data-bs-target="#sidebar" data-bs-toggle="offcanvas" type="button" className="btn btn-outline-info mx-3" aria-controls="sidebar">
              <span className="navbar-toggler-icon"></span>
            </button>
          )}
          {brandContent ? brandContent : (
            <Navbar.Brand className="navbar-text" href="/">

              Landing
            </Navbar.Brand>
          )}

          <div className="navbar-divider"></div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            {children}

          </Navbar.Collapse>
        </div>
      </Navbar>
      {includeSidebar && (
        <div className="offcanvas offcanvas-start" tabIndex={-1} id="sidebar">
          <Sidebar collapsed={false}></Sidebar>
        </div>
      )}

    </>
  )
}