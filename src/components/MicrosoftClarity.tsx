"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "vgee1wafw2";
const CLARITY_SCRIPT_ID = "clarity-script";
const CLARITY_FALLBACK_SCRIPT_ID = "clarity-script-fallback";

declare global {
    interface Window {
        clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
    }
}

export default function MicrosoftClarity() {
    const [showConsent, setShowConsent] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const initializedRef = useRef(false);

    const ensureClarityQueue = () => {
        if (typeof window === "undefined") return;
        if (window.clarity) return;
        const clarityQueue = ((...args: unknown[]) => {
            clarityQueue.q.push(args);
        }) as ((...args: unknown[]) => void) & { q: unknown[][] };
        clarityQueue.q = [];
        window.clarity = clarityQueue;
    };

    const callClarity = (...args: unknown[]) => {
        window.clarity?.(...args);
    };

    const injectScriptWithFallback = () => {
        const existingPrimary = document.getElementById(CLARITY_SCRIPT_ID);
        const existingFallback = document.getElementById(CLARITY_FALLBACK_SCRIPT_ID);
        if (existingPrimary || existingFallback) return;

        const primary = document.createElement("script");
        primary.id = CLARITY_SCRIPT_ID;
        primary.async = true;
        primary.src = `https://www.clarity.ms/tag/${CLARITY_ID}?ref=npm`;
        primary.onerror = () => {
            primary.remove();
            const fallback = document.createElement("script");
            fallback.id = CLARITY_FALLBACK_SCRIPT_ID;
            fallback.async = true;
            fallback.src = `https://clarity.ms/tag/${CLARITY_ID}?ref=npm`;
            document.head.appendChild(fallback);
        };

        document.head.appendChild(primary);
    };

    const initClarity = () => {
        if (initializedRef.current || !CLARITY_ID) return;
        ensureClarityQueue();
        injectScriptWithFallback();
        initializedRef.current = true;
    };

    const grantConsent = () => {
        initClarity();
        callClarity("consentv2", { ad_Storage: "granted", analytics_Storage: "granted" });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const consent = localStorage.getItem("clarity-consent");
        if (consent === "true") {
            grantConsent();
        } else if (consent === null) {
            setShowConsent(true);
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("clarity-consent", "true");
        grantConsent();
        setIsVisible(false);
        setTimeout(() => setShowConsent(false), 500);
    };

    const handleDecline = () => {
        localStorage.setItem("clarity-consent", "false");
        if (initializedRef.current) {
            callClarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
        }
        setIsVisible(false);
        setTimeout(() => setShowConsent(false), 500);
    };

    if (!mounted || !showConsent) return null;

    const banner = (
        <div
            style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                width: "400px",
                maxWidth: "calc(100vw - 32px)",
                zIndex: 99999,
                transition: "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                opacity: isVisible ? 1 : 0,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <div
                style={{
                    background: "#f8f1e8",
                    border: "1px solid rgba(139, 115, 85, 0.3)",
                    borderRadius: "12px",
                    boxShadow: "0 30px 70px rgba(45, 36, 23, 0.25)",
                    padding: "24px",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                                style={{
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    background: "#8B7355",
                                }}
                            />
                            <span
                                style={{
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    textTransform: "uppercase" as const,
                                    letterSpacing: "0.2em",
                                    color: "#8B7355",
                                }}
                            >
                                Privacy
                            </span>
                        </div>
                        <h3
                            style={{
                                fontSize: "20px",
                                fontWeight: 900,
                                color: "#2d2417",
                                letterSpacing: "-0.01em",
                                lineHeight: 1.2,
                                margin: 0,
                            }}
                        >
                            Enhance Your Experience
                        </h3>
                    </div>

                    <p
                        style={{
                            color: "#5c4d37",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            fontWeight: 600,
                            opacity: 0.9,
                            margin: 0,
                        }}
                    >
                        We use analytics to understand how we can build a better
                        space for our community. Your data is anonymized and
                        secure.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "4px" }}>
                        <button
                            onClick={handleAccept}
                            style={{
                                flex: "1.2",
                                background: "#2d2417",
                                color: "#f8f1e8",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: 900,
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                boxShadow: "0 4px 16px rgba(45, 36, 23, 0.2)",
                                whiteSpace: "nowrap" as const,
                            }}
                            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "#000"; }}
                            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "#2d2417"; }}
                        >
                            Accept All
                        </button>
                        <button
                            onClick={handleDecline}
                            style={{
                                flex: "1",
                                background: "rgba(139, 115, 85, 0.1)",
                                color: "#5c4d37",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: 900,
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                whiteSpace: "nowrap" as const,
                            }}
                            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "rgba(139, 115, 85, 0.2)"; }}
                            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "rgba(139, 115, 85, 0.1)"; }}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(banner, document.body);
}
